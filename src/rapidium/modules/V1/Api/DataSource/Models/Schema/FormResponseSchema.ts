import mongoose from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

const Schema = mongoose.Schema;
const formResponseSchema = new Schema(
  {
    users_id: { type: ObjectId, ref: 'users' },
    appointment_id: { type: ObjectId, ref: 'appointments', default: null },
    session_name: { type: String, default: null },
    type_form_id: { type: String },
    response: { type: Object },
    status: { type: Boolean, default: true },
    temp_status: { type: Boolean, default: true },
    created_date: { type: Date, default: Date.now },
    last_modified_date: { type: Date, default: Date.now },
    last_modified_by: { type: String },
    created_by: { type: String },
  }
);
const FormResponseSchema = mongoose.model('form_response', formResponseSchema);
export { FormResponseSchema };
