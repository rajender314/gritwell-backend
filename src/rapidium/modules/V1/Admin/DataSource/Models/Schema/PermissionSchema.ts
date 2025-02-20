import mongoose from 'mongoose';
import { Document } from 'mongoose';

interface IPermission extends Document {
  id: string
  name: string;
  type: string;
  code: string;
  value: string;
  parent_order: number;
  order: number;
  custome_fields: any;
  children: any;
  options: any;
  status: boolean
}

const Schema = mongoose.Schema;

const permissions = new Schema<IPermission>(
  {
    id: { type: String },
    name: { type: String },
    type: { type: String },
    code: { type: String },
    value: { type: String },
    parent_order: { type: Number },
    order: { type: Number },
    children: { type: Object },
    options: { type: Object },
    status: { type: Boolean },
  },
  { timestamps: true },
);
const PermissionSchema = mongoose.model<IPermission>('Permission', permissions);
export { PermissionSchema };
