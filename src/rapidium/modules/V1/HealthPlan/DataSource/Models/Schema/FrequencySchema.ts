import mongoose from 'mongoose';
import { Document } from 'mongoose'; 

interface IFrequency extends Document {
    id: string;
    name: string;
    period: string;
}
const Schema = mongoose.Schema;

const frequency = new Schema<IFrequency>(
    {
        id: { type: String },
        name: { type: String },
        period: { type: String },
    },
);
const FrequencySchema = mongoose.model<IFrequency>('frequencies', frequency);
export { FrequencySchema };
