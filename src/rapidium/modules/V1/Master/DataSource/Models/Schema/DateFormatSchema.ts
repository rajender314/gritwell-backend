import mongoose from 'mongoose';
import { Document } from 'mongoose';

interface IDateFormat extends Document {
    format: string;
    status: boolean;
}

const Schema = mongoose.Schema;

const roles = new Schema<IDateFormat>(
    {
        format: { type: String },
        status: { type: Boolean },
    }
);
const DateFormatSchema = mongoose.model<IDateFormat>('DateFormat', roles);
export { DateFormatSchema };
