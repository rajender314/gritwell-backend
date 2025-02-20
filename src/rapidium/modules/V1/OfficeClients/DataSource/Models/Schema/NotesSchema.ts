import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

interface INote extends Document {
  id: string;
  name: string;
  label: string;
  status: boolean;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}
const Schema = mongoose.Schema;

const notes = new Schema<INote>(
  {
    id: { type: String },
    name: { type: String },
    label: { type: String },
    status: { type: Boolean },
    created_date: { type: Date },
    created_by: {
      type: ObjectId,
      ref: 'users',
    },
    last_modified_date: { type: Date },
    last_modified_by: {
      type: ObjectId,
      ref: 'users',
    },

  },
);
const NotesSchema = mongoose.model<INote>('Note', notes);
export { NotesSchema };
