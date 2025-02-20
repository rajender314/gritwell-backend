import { CurrentAppointment }
    from '@basePath/Appointments/Commands/CurrentAppointment';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { AppointmentStatusesSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import DateFormat from '@rapCoreHelpers/DateFormat';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
// import BaseHelper from '@rapCoreHelpers/BaseHelper';
const environment = process.env;
/**
* class CurrentAppointmentDataSource
*/
export default class CurrentAppointmentDataSource {
    /**
    * @param {data} data CurrentAppointment
    * @return {Object}
    */
    async get(data: CurrentAppointment) {
        try {
            //Validate Client
            await new ValidateClient(data.client_id).validate();

            //Get Client Details
            const client = await UserSchema.findById(data.client_id);
            let clientInfo: any = {};
            if (client != null) {
                clientInfo = {
                    name: `${client.first_name} ${client.last_name}`,
                    email: client.email,
                    img_name: client.img_unique_name,
                    image: client.img_unique_name ? environment.api_base_url + client.img_unique_name : ''
                }
            }

            const statuses = await AppointmentStatusesSchema.find({}, { code: 1 });
            let scheduled: Types.ObjectId[] = [];
            let attended: Types.ObjectId[] = [];
            if (statuses.length) {
                scheduled = statuses.filter(status => (status.code === 'scheduled' || status.code === 'rescheduled')).map((status) => ObjectId(status._id));
                attended = statuses.filter(status => status.code === 'attended' || status.code === 'late-show').map((status) => ObjectId(status._id));
            }
            const preMatchQuery = {};
            const postMatchQuery = {};
            const project = {};
            // const date = new BaseHelper().Date();
            // console.log(1, new Date());
            // console.log(2, date);
            Object.assign(postMatchQuery, {
                "client_id": ObjectId(data.client_id),
                "status": { $in: scheduled },
                "end_date": { $gte: new Date() }
            });
            Object.assign(preMatchQuery, {
                "client_id": ObjectId(data.client_id),
                "status": { $in: attended },
                "end_date": { $lte: new Date() }
            });
            Object.assign(project, {
                _id: 1,
                start_date: 1,
                end_date: 1,
                name: 1,
                user_id: 1,
                appointment_type: 1,
                // health_plan: {
                //     _id: '$health_plan._id',
                //     is_submitted: '$health_plan.is_submitted',
                //     type: '$health_plan.type',
                //     last_modified_date: '$health_plan.last_modified_date'
                // },
                is_pre_session_servery_submitted: 1,
                is_post_session_servery_submitted: 1
            });

            const pre = await this.appointmentQuery(preMatchQuery, project, 'pre');
            const post = await this.appointmentQuery(postMatchQuery, project, 'post');
            const current = await this.appointmentToAttend(data, statuses, scheduled);
            const typeFormDetails: any = {
                type_form_id: environment.TYPE_FORM_CLIENT_HAPPINESS,
                type_form_name: 'Client Happiness Score'
            }
            return { clientInfo, post, pre, current, typeFormDetails };

        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
    * @param {data} match matchObject
    * @param {data} project projectObject
    * @return {Object}
    */
    async appointmentQuery(match, project, type) {
        return await AppointmentSchema.aggregate([
            { $match: match },
            // {
            //     $lookup: {
            //         from: 'customer_health_plans',
            //         localField: '_id',
            //         foreignField: 'appointment_id',
            //         as: 'health_plan',
            //     },
            // },
            // {
            //     $unwind: {
            //         path: '$health_plan',
            //         preserveNullAndEmptyArrays: true,
            //     },
            // },
            { $sort: { 'start_date': 1 } },
            { $limit: 1 },
            { $project: project }
        ]).then(appointments => {
            let appointmentInfo: any = {};
            if (appointments && appointments[0]) {
                const appointmentType = this.appointmentType(appointments[0].appointment_type);
                let key = '';
                let value = false;
                if (type === 'pre') {
                    key = 'is_pre_session_servery_submitted';
                    value = appointments[0].is_pre_session_servery_submitted;
                } else {
                    key = 'is_post_session_servery_submitted';
                    value = appointments[0].is_post_session_servery_submitted;
                }
                // const date = new DateFormat().appointmentDate(appointments[0].start_date);
                // const time = new DateFormat().appointmentTime(appointments[0].start_date, appointments[0].end_date);
                appointmentInfo = {
                    // date,
                    // time,
                    start_date: appointments[0].start_date,
                    end_date: appointments[0].end_date,
                    appointment_type: appointmentType,
                    name: appointments[0].name,
                    [key]: value,
                    // health_plan: appointments[0].health_plan,
                    _id: appointments[0]._id
                }
            }
            return appointmentInfo;
        });
    }

    /**
    * @param {data} data CurrentAppointment
    * @param {statuses} statuses Array
    * @return {Object}
    */
    async appointmentToAttend(data: CurrentAppointment, statuses, scheduled) {
        let appointmentStatuses: any = [];
        let appointment: any = {};
        const appointmentToAttend = await AppointmentSchema.find(
            {
                end_date: { $lte: new Date() },
                client_id: data.client_id,
                status: { $in: scheduled }
            },
            { name: 1, appointment_type: 1, client_attendance_submitted: 1 }
        ).sort({ 'start_date': 1 }).limit(1);
        if (appointmentToAttend && appointmentToAttend[0]) {
            const { _id, name, appointment_type, client_attendance_submitted } = appointmentToAttend[0];
            const type = this.appointmentType(appointment_type);
            if (statuses.length) {
                statuses.filter(status => (status.code === 'attended' || status.code === 'no-show' || status.code === 'late-show')).map((status) => {
                    let label = '';
                    let order = 0;
                    if (status.code === 'attended') {
                        label = 'Yes';
                        order = 1;
                    }
                    if (status.code === 'no-show') {
                        label = 'No';
                        order = 2;
                    }
                    if (status.code === 'late-show') {
                        label = 'Yes, but the client was late';
                        order = 3;
                    }
                    appointmentStatuses.push({
                        code: status.code,
                        label,
                        order,
                        value: status._id
                    })
                });
            }
            appointment = { _id, name, type, client_attendance_submitted, statuses: appointmentStatuses };
        }
        return appointment;
    }

    /**
    * @param {data} type String
    * @return {string}
    */
    appointmentType(type) {
        return type === 'INITIAL_APPOINTMENT' ? 'initial appointment' : 'follow-up appointment';
    }
}