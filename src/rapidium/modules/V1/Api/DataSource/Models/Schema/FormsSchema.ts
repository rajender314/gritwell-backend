import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
enum Type {
  HEALTH = "health",
  FEEDBACK = "feedback"
}
interface IForm extends Document {
  type_form_id: string;
  title: string;
  code: string;
  name: string;
  type: string;
  self_url: string;
  theme_url: string;
  status: boolean;
  temp_status: boolean;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;
const formsSchema = new Schema<IForm>(
  {
    type_form_id: { type: String },
    title: { type: String },
    code: { type: String },
    name: { type: String },
    type: {
      type: String,
      enum: Type
    },
    self_url: { type: String },
    theme_url: { type: String },
    status: { type: Boolean, default: true },
    temp_status: { type: Boolean, default: true },
    created_date: { type: Date, default: Date.now },
    last_modified_date: { type: Date, default: Date.now },
    last_modified_by: { type: String },
    created_by: { type: String },

  }
);
const FormsSchema = mongoose.model<IForm>('form', formsSchema);
export { FormsSchema };
