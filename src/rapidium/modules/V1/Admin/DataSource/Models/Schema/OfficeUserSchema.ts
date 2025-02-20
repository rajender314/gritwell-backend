import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { IExperience, ITimeZone } from '@basePath/Admin/Interfaces/IUsers';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface IOfficeUser extends Document {
  user_id: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  is_password_updated: boolean;
  phone: string;
  img_file_name: string;
  img_unique_name: string;
  role_id: Types.ObjectId;
  zoom_link: string;
  qualifications: string;
  background: string;
  experience: IExperience;
  time_zone: ITimeZone;
  allocation: number;
  available: number;
  specialists: Array<string>;
  day_of_the_week: Array<string>;
  is_admin: boolean;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;
const officeUsers = new Schema<IOfficeUser>(
  {
    user_id: { type: ObjectId, ref: 'users' },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    is_password_updated: { type: Boolean },
    phone: { type: String },
    img_file_name: { type: String },
    img_unique_name: { type: String },
    role_id: { type: ObjectId, ref: 'roles' },
    zoom_link: { type: String },
    qualifications: { type: String },
    background: { type: String },
    experience: { type: Object },
    time_zone: { type: Object },
    allocation: { type: Number },
    available: { type: Number },
    specialists: { type: Array },
    day_of_the_week: { type: Array },
    is_admin: { type: Boolean },
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
  //{ timestamps: true, minimize: false },
  { minimize: false },
);
officeUsers.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const OfficeUserSchema = mongoose.model<IOfficeUser>(
  'office_user',
  officeUsers,
);
export { OfficeUserSchema };
