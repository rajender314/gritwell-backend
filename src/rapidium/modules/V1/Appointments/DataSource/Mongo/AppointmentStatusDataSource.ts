import { UpdateAppointmentStatus }
    from '@basePath/Appointments/Commands/UpdateAppointmentStatus';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { AppointmentStatusesSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
/**
 * class AppointmentStatusDataSource
 */
export default class AppointmentStatusDataSource {

    /**
     * @param {data} data UpdateAppointmentStatus
     * @return {Object}
     */
    async update(data: UpdateAppointmentStatus) {
        const appointmentStatus = await AppointmentStatusesSchema.findOne({ "code": "attended" });
        const appointments = await AppointmentSchema.find({
            start_date: { $lt: new Date() }
        });
        if (appointments.length && appointmentStatus != null) {
            await this.updateStatuses(appointments, async (appointment) => {
                if (appointment._id) {
                    await AppointmentSchema.findByIdAndUpdate(
                        appointment._id,
                        { status: appointmentStatus._id }
                    )
                }
            });
        }
    }

    updateStatuses = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };
}
