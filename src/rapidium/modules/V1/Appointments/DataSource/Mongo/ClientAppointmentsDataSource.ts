import { ClientAppointments }
    from '@basePath/Appointments/Commands/ClientAppointments';
import { UpdateAppointment }
    from '@basePath/Appointments/Commands/UpdateAppointment';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { AppointmentStatusesSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
import { ValidateAppointment }
    from
    '@basePath/Appointments/DataSource/Mongo/ValidateAppointment';
import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { FormResponseSchema } from "@basePath/Api/DataSource/Models/Schema/FormResponseSchema";
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import DateFormat from '@rapCoreHelpers/DateFormat';

const environment = process.env;
const typeFormPreAppointment: string = environment.TYPE_FORM_PRE_APPOINTMENT || '';
const typeFormPostAppointment: string = environment.TYPE_FORM_POST_APPOINTMENT || '';
const typeFormIds: any = {
    [typeFormPreAppointment]: {
        key: 'pre_session'
    },
    [typeFormPostAppointment]: {
        key: 'post_session'
    }
}
/**
 * class ClientAppointmentsDataSource
 */
export default class ClientAppointmentsDataSource {
    /**
     * @param {data} data ClientAppointments
     * @return {Object}
     */
    async get(data: ClientAppointments) {
        try {
            await new ValidateClient(data.client_id).validate();
            //Get Pre and Post Session Surveys
            const surveyResponses = await FormResponseSchema.find({
                $and: [
                    { $and: [{ users_id: ObjectId(data.client_id) }] },
                    { $or: [{ type_form_id: typeFormPreAppointment }, { type_form_id: typeFormPostAppointment }] }
                ]
            })
            let surveys = new Array();
            if (surveyResponses.length) {
                surveyResponses.map((response: any) => {
                    if (typeFormIds[response.type_form_id]) {
                        let appointment_id = String(response.appointment_id);
                        let key = String(typeFormIds[response.type_form_id].key);
                        surveys[appointment_id] = surveys[response.appointment_id] || {}
                        surveys[appointment_id][key] = { type_form_id: response.type_form_id, form_response_id: response._id };
                    }
                })
            }

            //Get HealthPlan based on Client Details
            const clientHealthPlans = await ClientHealthPlanSchema.find({ client_id: ObjectId(data.client_id), is_submitted: true });
            let healthPlanAppointment: any = [];
            if (clientHealthPlans.length) {
                clientHealthPlans.map(healthPlan => {
                    healthPlanAppointment[healthPlan.appointment_id.toString()] = healthPlan._id;
                });
            }

            return await AppointmentSchema.aggregate([
                {
                    $match: {
                        "client_id": ObjectId(data.client_id)
                    }
                },
                {
                    $lookup: {
                        from: 'office_users',
                        localField: 'user_id',
                        foreignField: 'user_id',
                        as: 'office_users_data',
                    }
                },
                {
                    $unwind: {
                        path: '$office_users_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'appointment_statuses',
                        localField: 'status',
                        foreignField: '_id',
                        as: 'status_data',
                    },
                },
                {
                    $unwind: {
                        path: '$status_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                { $sort: { 'start_date': -1 } },
                {
                    $facet: {
                        paginated_results: [
                            {
                                $project: {
                                    start_date: 1,
                                    end_date: 1,
                                    name: 1,
                                    user_id: 1,
                                    appointment_type: 1,
                                    acuity_confirmation_page: 1,
                                    status: {
                                        value: '$status_data._id',
                                        label: '$status_data.name',
                                        code: '$status_data.code',
                                        color: '$status_data.color'
                                    }
                                }
                            }
                        ],
                        total_count: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                }

            ]).then(async (appointmentsData: any) => {
                let appointments = appointmentsData[0].paginated_results;
                const appointmentsCount: number =
                    appointmentsData[0].total_count &&
                        appointmentsData[0].total_count[0] &&
                        appointmentsData[0].total_count[0].count ?
                        appointmentsData[0].total_count[0].count :
                        0;
                const clientAppointments: any = [];
                if (appointments.length) {
                    appointments.map(async (appointment) => {
                        const appointmentObj: any = {
                            _id: appointment._id,
                            start_date: appointment.start_date,
                            end_date: appointment.end_date,
                            name: appointment.name,
                            status: appointment.status,
                            health_plan_id: healthPlanAppointment && healthPlanAppointment[appointment._id] ? healthPlanAppointment[appointment._id] : '',
                            pre_session: surveys && surveys[appointment._id] && surveys[appointment._id]['pre_session'] ? surveys[appointment._id]['pre_session'] : {},
                            post_session: surveys && surveys[appointment._id] && surveys[appointment._id]['post_session'] ? surveys[appointment._id]['post_session'] : {},
                        }
                        clientAppointments.push(appointmentObj);
                    })
                }
                return { result: clientAppointments, count: appointmentsCount };
            }).catch(async (error: any) => {
                return { success: false, message: error.message };
            });
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
     * @param {data} data UpdateAppointment
     * @return {Object}
     */
    async update(data: UpdateAppointment) {
        try {
            await new ValidateAppointment(data.id).validate();
            const status = await AppointmentStatusesSchema.findOne({ _id: data.status });
            if (status != null && (status.code === 'attended' || status.code === 'late-show' || status.code === 'no-show')) {
                const futureAppointment = await AppointmentSchema.findOne(
                    {
                        _id: data.id,
                        end_date: { $gte: new Date() }
                    }
                );
                if (futureAppointment != null) {
                    throw new ResourceNotFound('Future appointment cannot be updated', '');
                }
            }
            if (status == null) {
                throw new ResourceNotFound('Not a valid Status', '');
            }
            let updateObj: any = {};
            if (data.from === 'client_attendance') {
                updateObj = {
                    status: data.status,
                    client_attendance_submitted: true,
                    last_modified_by: data.last_modified_by,
                    last_modified_date: data.last_modified_date
                }
            } else {
                updateObj = {
                    status: data.status,
                    last_modified_by: data.last_modified_by,
                    last_modified_date: data.last_modified_date
                }
            }
            return await AppointmentSchema
                .findByIdAndUpdate(
                    data.id,
                    updateObj
                );
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
}
