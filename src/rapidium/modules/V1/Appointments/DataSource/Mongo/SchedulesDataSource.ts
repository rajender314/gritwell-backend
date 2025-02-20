import { Schedules }
    from '@basePath/Appointments/Commands/Schedules';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { FormResponseSchema } from "@basePath/Api/DataSource/Models/Schema/FormResponseSchema";
// import { AppointmentStatusesSchema }
//     from
//     '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
// import DateFormat from '@rapCoreHelpers/DateFormat';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
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
 * class SchedulesDataSource
 */
export default class SchedulesDataSource {
    /**
     * @param {data} data
     * @return {Object}
     */
    async get(data: Schedules) {
        try {
            if (!['upcoming', 'past'].includes(data.type)) {
                throw new ResourceNotFound(`${data.type} is not a valid param`, '');
            }
            const skip = (data.page - 1) * data.perPage;
            const limit = data.perPage;
            const sort = data.sort == 'DESC' ? -1 : 1;
            const search = data.search.replace(/\s+/g, ' ').trim();
            const searchQry = {};
            const filterQry = {};

            if (data.userData.code != 'admin') {
                Object.assign(filterQry, { "user_id": data.userData.user_id });
            }

            const surveyResponses = await FormResponseSchema.find({
                $and: [
                    { $or: [{ type_form_id: typeFormPreAppointment }, { type_form_id: typeFormPostAppointment }] }
                ]
            })
            let surveys = new Array();
            if (surveyResponses.length) {
                surveyResponses.map((response: any) => {
                    if (typeFormIds[response.type_form_id]) {
                        let appointment_id = String(response.appointment_id);
                        let users_id = String(response.users_id);
                        let key = String(typeFormIds[response.type_form_id].key);
                        surveys[users_id] = surveys[response.users_id] || {}
                        surveys[users_id][appointment_id] = surveys[response.users_id][response.appointment_id] || {}
                        surveys[users_id][appointment_id][key] = { type_form_id: response.type_form_id, form_response_id: response._id };
                    }
                })
            }

            if (data.search != '') {
                Object.assign(searchQry, {
                    $or: [
                        { 'customer_data.first_name': { $regex: `.*${search}.*`, $options: 'i', } },
                        { 'customer_data.last_name': { $regex: `.*${search}.*`, $options: 'i' } },
                        {
                            $expr: {
                                $regexMatch: {
                                    input: {
                                        $concat: [
                                            '$customer_data.first_name',
                                            ' ',
                                            '$customer_data.last_name',
                                        ],
                                    },
                                    regex: search,
                                    options: 'i',
                                },
                            },
                        },
                        { 'health_coach_data.first_name': { $regex: `.*${search}.*`, $options: 'i', } },
                        { 'health_coach_data.last_name': { $regex: `.*${search}.*`, $options: 'i' } },
                        {
                            $expr: {
                                $regexMatch: {
                                    input: {
                                        $concat: [
                                            '$health_coach_data.first_name',
                                            ' ',
                                            '$health_coach_data.last_name',
                                        ],
                                    },
                                    regex: search,
                                    options: 'i',
                                },
                            },
                        },
                        { 'physician.assignment_user_info.first_name': { $regex: `.*${search}.*`, $options: 'i' } },
                        { 'physician.assignment_user_info.last_name': { $regex: `.*${search}.*`, $options: 'i' } },
                        {
                            $expr: {
                                $regexMatch: {
                                    input: {
                                        $concat: [
                                            '$physician.assignment_user_info.first_name',
                                            ' ',
                                            '$physician.assignment_user_info.last_name',
                                        ],
                                    },
                                    regex: search,
                                    options: 'i',
                                },
                            },
                        },
                    ],
                });
            }

            const sortQuery = {};
            if (data.column != '' && sort) {
                let column = '';
                if (data.column === 'clientname') {
                    column = 'customer_data.first_name';
                } else if (data.column === 'physician') {
                    column = 'physician.assignment_user_info.first_name';
                } else if (data.column === 'health_coach') {
                    column = 'health_coach_data.first_name';
                } else {
                    column = data.column;
                }
                Object.assign(sortQuery, {
                    [column]: sort
                });
            } else {
                Object.assign(sortQuery, {
                    'first_name': sort
                });
            }

            if (data.status != '') {
                const statuses = data.status.split(',');
                const statusesArr = statuses.map((s) => ObjectId(s));
                Object.assign(filterQry, {
                    'status': { $in: statusesArr },
                });
            }

            const matchQry = {};
            if (data.type === 'upcoming') {
                Object.assign(matchQry, { start_date: { $gt: new Date() } });
            }
            if (data.type === 'past') {
                Object.assign(matchQry, { start_date: { $lt: new Date() } });
            }
            const date = new Date(data.year, data.month);
            const month = date.getMonth();
            const year = date.getFullYear();
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);

            return await AppointmentSchema.aggregate([
                {
                    $match: {
                        start_date: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                },
                { $match: filterQry },
                { $match: matchQry },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'client_id',
                        foreignField: '_id',
                        as: 'customer_data',
                    },
                },
                {
                    $unwind: {
                        path: '$customer_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'health_coach_data',
                    },
                },
                {
                    $unwind: {
                        path: '$health_coach_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'customer_assignments',
                        let: { id: '$client_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$client_id', '$$id'] },
                                },
                            },
                            { $match: { type: 'md' } },
                            {
                                $lookup: {
                                    from: 'users',
                                    let: { id: '$assignment_user_id' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: { $eq: ['$_id', '$$id'] },
                                            },
                                        },
                                        { $project: { first_name: 1, last_name: 1, email: 1 } }
                                    ],
                                    as: 'assignment_user_info',
                                },
                            },
                            { $unwind: { path: '$assignment_user_info', preserveNullAndEmptyArrays: true } }
                        ],
                        as: 'physician',
                    },
                },
                { $unwind: { path: '$physician', preserveNullAndEmptyArrays: true } },
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
                // { $sort: { 'start_date': -1 } },
                { $match: searchQry },
                { $sort: sortQuery },
                {
                    $facet: {
                        paginated_results: [
                            {
                                $skip: skip,
                            },
                            { $limit: limit },
                            {
                                $project: {
                                    id: 1,
                                    name: 1,
                                    appointment_type: 1,
                                    client_id: 1,
                                    start_date: 1,
                                    end_date: 1,
                                    acuity_confirmation_page: 1,
                                    status: {
                                        value: '$status_data._id',
                                        label: '$status_data.name',
                                        code: '$status_data.code',
                                        color: '$status_data.color'
                                    },
                                    client_info: {
                                        client_id: '$customer_data._id',
                                        name: { $concat: ['$customer_data.first_name', " ", '$customer_data.last_name'] },
                                    },
                                    health_coach: {
                                        name: { $concat: ['$health_coach_data.first_name', " ", '$health_coach_data.last_name'] },
                                    },
                                    physician: {
                                        name: { $concat: ['$physician.assignment_user_info.first_name', " ", '$physician.assignment_user_info.last_name'] },
                                    }
                                },
                            },
                        ],
                        total_count: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                }
            ])
                .collation({ locale: 'en', strength: 1 })
                .allowDiskUse(true)
                .then(async (appointmentsData: any) => {
                    let appointments = appointmentsData[0].paginated_results;
                    const appointmentsCount: number =
                        appointmentsData[0].total_count &&
                            appointmentsData[0].total_count[0] &&
                            appointmentsData[0].total_count[0].count ?
                            appointmentsData[0].total_count[0].count :
                            0;
                    const adminApointments: any = [];
                    if (appointments.length > 0) {
                        appointments.map(async (appointment) => {
                            const appointmentObj: any = {
                                _id: appointment._id,
                                start_date: appointment.start_date,
                                end_date: appointment.end_date,
                                name: appointment.name,
                                client_id: appointment.client_id,
                                client_info: appointment.client_info,
                                health_coach: appointment.health_coach,
                                physician: appointment.physician,
                                status: appointment.status,
                                acuity_confirmation_page: appointment.acuity_confirmation_page,
                                appointment_type: appointment.appointment_type,
                                pre_session: surveys && surveys[appointment.client_id] && surveys[appointment.client_id][appointment._id] && surveys[appointment.client_id][appointment._id]['pre_session'] ? surveys[appointment.client_id][appointment._id]['pre_session'] : {},
                                post_session: surveys && surveys[appointment.client_id] && surveys[appointment.client_id][appointment._id] && surveys[appointment.client_id][appointment._id]['post_session'] ? surveys[appointment.client_id][appointment._id]['post_session'] : {},
                            }
                            adminApointments.push(appointmentObj);
                        })
                    }
                    return { result: adminApointments, count: appointmentsCount };
                });
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
}
