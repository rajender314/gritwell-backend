import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface IClientNote extends Document {
  id: Types.ObjectId;
  client_id: Types.ObjectId;
  note_id: Types.ObjectId;
  note_name: string;
  note_label: string;
  description: string;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}
const Schema = mongoose.Schema;

const notes = new Schema<IClientNote>(
  {
    id: { type: String },
    client_id: { type: ObjectId, ref: 'users' },
    note_id: { type: ObjectId, ref: 'notes' },
    note_name: { type: String },
    note_label: { type: String },
    description: { type: String },
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
notes.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientNotesSchema = mongoose.model<IClientNote>('customer_notes', notes);
export { ClientNotesSchema };
