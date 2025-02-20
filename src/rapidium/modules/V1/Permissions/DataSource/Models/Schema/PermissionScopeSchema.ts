import mongoose from 'mongoose';

import { Document } from 'mongoose';

interface IPermissionScope extends Document {
  permission_id: string;
  route: string;
  method: string;
  options_value: Array<number>;
}

const Schema = mongoose.Schema;

const permissionsScope = new Schema<IPermissionScope>(
  {
    permission_id: { type: String },
    route: { type: String },
    method: { type: String },
    options_value: { type: Array },
  }
);
const PermissionScopeSchema = mongoose.model<IPermissionScope>(
  'permission_scopes',
  permissionsScope,
);
export { PermissionScopeSchema };
