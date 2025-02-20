import mongoose from 'mongoose';
import { Document } from 'mongoose';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface IRole extends Document {
  name: string;
  code: string;
  permission: any;
  assign_client_to: any;
  custome_fields: any;
  order: number;
  status: boolean;
}

const Schema = mongoose.Schema;

const roles = new Schema<IRole>(
  {
    name: { type: String },
    code: { type: String },
    permission: { type: Object },
    assign_client_to: { type: Object },
    custome_fields: { type: Object },
    order: { type: Number },
    status: { type: Boolean },
  }
);
roles.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const RoleSchema = mongoose.model<IRole>('Role', roles);
export { RoleSchema };
