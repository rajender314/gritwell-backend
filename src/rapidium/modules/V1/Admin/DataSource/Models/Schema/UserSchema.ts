import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

interface IUser extends Document {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: number;
  is_password_updated: boolean;
  role_id: Types.ObjectId;
  status: boolean;
  is_admin: boolean,
  offset: string;
  img_file_name: string;
  img_unique_name: string;
  is_email_verified: boolean;
  email_verified_at: Date;
  acuity_calendar_id: number,
  acuity_owner_id: number,
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}
const Schema = mongoose.Schema;

const users = new Schema<IUser>(
  {
    email: { type: String },
    password: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    user_type: { type: Number },
    is_password_updated: { type: Boolean },
    role_id: { type: ObjectId, ref: 'roles' },
    img_file_name: { type: String },
    img_unique_name: { type: String },
    status: { type: Boolean },
    is_admin: { type: Boolean },
    offset: { type: String },
    is_email_verified: { type: Boolean, default: false },
    email_verified_at: { type: Date },
    acuity_calendar_id: { type: Number },
    acuity_owner_id: { type: Number },
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

const UserSchema = mongoose.model<IUser>('User', users);
export { UserSchema };
