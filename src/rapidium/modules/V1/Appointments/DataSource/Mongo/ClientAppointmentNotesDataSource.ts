import { GetClientAppointmentNotes }
    from '@basePath/Appointments/Commands/GetClientAppointmentNotes';
import { CreateClientAppointmentNotes }
    from '@basePath/Appointments/Commands/CreateClientAppointmentNotes';
import { DeleteAppointmentNotes }
    from '@basePath/Appointments/Commands/DeleteAppointmentNotes';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { AppointmentNotesSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentNotesSchema';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { ValidateAppointment }
    from
    '@basePath/Appointments/DataSource/Mongo/ValidateAppointment';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import DateFormat from '@rapCoreHelpers/DateFormat';
const environment = process.env;

/**
 * class ClientAppointmentNotesDataSource
 */
export default class ClientAppointmentNotesDataSource {
    /**
     * @param {data} data GetClientAppointmentNotes
     * @return {Object}
     */
    async get(data: GetClientAppointmentNotes) {
        try {
            await new ValidateClient(data.client_id).validate();
            //Appointment details 
            const appointment = await this.getAppointmentDetails(data);

            //Appointment Notes
            const notes = await AppointmentNotesSchema.find(
                {
                    client_id: data.client_id,
                    appointment_id: data.appointment_id
                },
                { _id: 1, title: 1, description: 1 }
            );
            return { appointment, notes };
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
    * @param {data} data GetClientAppointmentNotes
    * @return {Object}
    */
    async create(data: CreateClientAppointmentNotes) {
        try {
            await new ValidateClient(data.client_id).validate();
            await new ValidateAppointment(data.appointment_id).validate();
            if (data.payload.length) {
                await this.createOrUpdateAppointmentNotes(data.payload, async (notes) => {
                    if (notes._id) {
                        await AppointmentNotesSchema
                            .findByIdAndUpdate(
                                notes._id,
                                {
                                    title: notes.title,
                                    description: notes.description,
                                    order: notes.order,
                                    last_modified_by: data.last_modified_by,
                                    last_modified_date: data.last_modified_date
                                }
                            )
                    } else {
                        await AppointmentNotesSchema.create({
                            client_id: data.client_id,
                            appointment_id: data.appointment_id,
                            title: notes.title,
                            description: notes.description,
                            created_by: data.created_by,
                            created_date: data.created_date,
                            last_modified_by: data.last_modified_by,
                            last_modified_date: data.last_modified_date
                        });
                    }
                });
                //Update Lastmodified details
                await AppointmentSchema
                    .findByIdAndUpdate(
                        data.appointment_id,
                        {
                            last_modified_by: data.last_modified_by,
                            last_modified_date: data.last_modified_date
                        }
                    )
            }
            return true;
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
     * @param {data} data DeleteAppointmentNotes
     * @return {Object}
     */
    async delete(data: DeleteAppointmentNotes) {
        try {
            return await AppointmentNotesSchema.findOneAndDelete(
                {
                    _id: ObjectId(data.id)
                },
                {
                    __user: { last_modified_by: ObjectId(data.last_modified_by) },
                }
            )
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
     * @param {data} data GetClientAppointmentNotes
     * @return {Object}
     */
    async getAppointmentDetails(data: GetClientAppointmentNotes) {
        try {
            return await AppointmentSchema.aggregate([
                { $match: { _id: ObjectId(data.appointment_id) } },
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
                    $project: {
                        id: 1,
                        name: 1,
                        appointment_type: 1,
                        start_date: 1,
                        end_date: 1,
                        last_modified_date: 1,
                        first_name: '$customer_data.first_name',
                        last_name: '$customer_data.last_name',
                        client_info: {
                            name: { $concat: ['$customer_data.first_name', " ", '$customer_data.last_name'] },
                            email: '$customer_data.email',
                            img_name: '$customer_data.img_unique_name',
                            image: '$customer_data.img_unique_name' ?
                                {
                                    $concat: [
                                        environment.api_base_url,
                                        '',
                                        '$customer_data.img_unique_name',
                                    ],
                                } :
                                '',
                        },
                    },
                },
            ]).then(async (appointments: any) => {
                let appointmentDetails: any = {};
                if (appointments && appointments[0]) {
                    const date = new DateFormat().appointmentDate(appointments[0].start_date);
                    const time = new DateFormat().appointmentTime(appointments[0].start_date, appointments[0].end_date);
                    let appointmentType = appointments[0] && appointments[0].appointment_type && appointments[0].appointment_type === 'INITIAL_APPOINTMENT' ? 'Intial Appointment' : 'Followup Appointment';
                    appointmentDetails = {
                        client: `${appointments[0].first_name} ${appointments[0].last_name}`,
                        client_info: appointments[0].client_info,
                        date,
                        time,
                        appointment_type: `${appointmentType} Notes`,
                        last_modified_date: appointments[0].last_modified_date
                    }
                }
                return appointmentDetails;
            });
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    //create and update promise
    createOrUpdateAppointmentNotes = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };
}
