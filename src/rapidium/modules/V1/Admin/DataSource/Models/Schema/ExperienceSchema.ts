import mongoose from 'mongoose';
import {Document} from 'mongoose';

interface IExperience extends Document {
    id: string;
    name: string;
    status: boolean;
    label: string;
    value: any;
}

const Schema = mongoose.Schema;

const experience = new Schema<IExperience>(
    {
      id: {type: String},
      name: {type: String},
      status: {type: Boolean},
      label: {type: String},
    },
    {timestamps: true},
);
const ExperienceSchema = mongoose.model<IExperience>('Experience', experience);
export {ExperienceSchema};
