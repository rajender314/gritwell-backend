import mongoose from 'mongoose';
import { Document } from 'mongoose';

interface IUnit extends Document {
    id: string;
    name: string;
}
const Schema = mongoose.Schema;

const units = new Schema<IUnit>(
    {
        id: { type: String },
        name: { type: String }
    },
);
const UnitsSchema = mongoose.model<IUnit>('units', units);
export { UnitsSchema };
