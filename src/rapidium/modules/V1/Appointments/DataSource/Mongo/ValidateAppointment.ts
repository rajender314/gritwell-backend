import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ValidateAppointment
*/
export class ValidateAppointment {
    public id: string;
    constructor(id) {
        this.id = id;
    }
    async validate() {
        try {
            const appointment = await AppointmentSchema.findById(this.id);
            if (appointment == null) {
                throw new ResourceNotFound('Not a valid appointment', '');
            }
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
}