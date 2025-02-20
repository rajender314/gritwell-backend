import mongoose from 'mongoose';
import {Document} from 'mongoose';

interface IColorCode extends Document {
    id: string;
    color: string;
    min: number;
    max: number
  }
const Schema = mongoose.Schema;

const colorCodes = new Schema<IColorCode>(
    {
      id: {type: String},
      color: {type: String},
      min: {type: Number},
      max: {type: Number},
    },
    {timestamps: true},
);
const ColorCodesSchema = mongoose.model<IColorCode>('color_codes', colorCodes);
export {ColorCodesSchema};
