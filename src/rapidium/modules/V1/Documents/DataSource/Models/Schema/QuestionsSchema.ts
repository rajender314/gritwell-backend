import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

interface IQuestions extends Document {
  forms_id: string;
  type_form_id: string;
  typeform_question_id: any;
  typeform_question_parent_id: any;
  type: string;
  typeform_question_ref_id: string;
  title: string;
  // properties: any;
  validations: any;
  status: boolean;
  temp_status: boolean;
}

const Schema = mongoose.Schema;
const questionsSchema = new Schema<IQuestions>(
  {
    forms_id: { type: ObjectId, ref: 'forms' },
    type_form_id: { type: String },
    typeform_question_id: { type: String },
    typeform_question_parent_id: { type: String, default: null },
    type: { type: String },
    typeform_question_ref_id: { type: String },
    title: { type: String },
    // properties: {type: Object},
    choice_score: { type: Object },
    validations: { type: Object },
    attachment: { type: ObjectId },
    metadata: { type: ObjectId },
    status: { type: Boolean, default: true },
    temp_status: { type: Boolean, default: true },
    create_date: { type: Date, default: Date.now },
    last_modified_date: { type: Date, default: Date.now },
    last_modified_by: { type: String },
    created_by: { type: String },
  }
);
const QuestionsSchema = mongoose.model<IQuestions>(
  'questions',
  questionsSchema,
);
export { QuestionsSchema };
