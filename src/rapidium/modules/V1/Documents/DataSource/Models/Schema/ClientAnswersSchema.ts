import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

interface Answer {
  value: string
}
interface IClientAnswer extends Document {
  type_form_id: string;
  form_response_id: string;
  appointment_id: string;
  question_id: string;
  answer_value: Answer;
  type: string;
  users_id: string;
  question_field: string;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}
const Schema = mongoose.Schema;
const clientAnswersSchema = new Schema<IClientAnswer>(
  {
    type_form_id: { type: String },
    form_response_id: { type: ObjectId, ref: 'form_response' },
    appointment_id: { type: ObjectId, ref: 'appointments', default: null },
    question_id: { type: String },
    answer_value: { type: Object },
    // score: { type: String },
    type: { type: String },
    users_id: { type: ObjectId, ref: 'users', default: null },
    question_field: { type: Object },
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
  }
);
const ClientAnswersSchema = mongoose.model<IClientAnswer>(
  'customer_answers',
  clientAnswersSchema,
);
export { ClientAnswersSchema };
