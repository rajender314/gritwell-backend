import mongoose from 'mongoose';
import { Document } from 'mongoose';

interface IClientStatuses extends Document {
    id: string;
    name: string;
    code: string;
    color: string;
    status: boolean;
}
const Schema = mongoose.Schema;

const phasesOfCareStatuses = new Schema<IClientStatuses>(
    {
        id: { type: String },
        name: { type: String },
        code: { type: String },
        color: { type: String },
        status: { type: Boolean },
    },
);
const ClientStatusesSchema = mongoose.model<IClientStatuses>('customer_statuses', phasesOfCareStatuses);
export { ClientStatusesSchema };
