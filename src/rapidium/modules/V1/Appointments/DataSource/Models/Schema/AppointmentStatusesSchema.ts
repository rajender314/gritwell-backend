import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

interface IAppointmentStatus extends Document {
    id: string;
    name: string;
    code: string;
    color: string;
}

const Schema = mongoose.Schema;

const statuses = new Schema<IAppointmentStatus>(
    {
        id: { type: String },
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
);
const AppointmentStatusesSchema = mongoose.model<IAppointmentStatus>('appointment_statuses', statuses);
export { AppointmentStatusesSchema };
