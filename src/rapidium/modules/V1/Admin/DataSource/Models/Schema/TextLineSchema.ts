import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';

interface ITextLineData extends Document {
  data: string;
}
const Schema = mongoose.Schema;

const users = new Schema<ITextLineData>(
    {
      data: {type: Object},
    },
    {timestamps: true},
);

const TextLineSchema = mongoose.model<ITextLineData>('TextLine', users);
export {TextLineSchema};
