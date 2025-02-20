import mongoose from 'mongoose';

import { Document } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

interface IQuestionOptions extends Document {
  id: string;
  question_id: string;
  type_form_id: string;
  typeform_question_id: string;
  label: string;
  score: string;
  choice_id: string;
  choice_ref_id: string;
}

const Schema = mongoose.Schema;

const questionOptions = new Schema<IQuestionOptions>(
  {
    id: { type: String },
    question_id: { type: ObjectId, ref: 'questions' },
    type_form_id: { type: String },
    typeform_question_id: { type: String },
    label: { type: String },
    score: { type: String },
    choice_id: { type: String },
    choice_ref_id: { type: String },
  }
);
const QuestionOptionsSchema = mongoose.model<IQuestionOptions>(
  'question_options',
  questionOptions,
);
export { QuestionOptionsSchema };
