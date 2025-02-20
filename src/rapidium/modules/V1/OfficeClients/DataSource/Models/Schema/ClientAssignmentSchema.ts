import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface IClientAssignment extends Document {
  id: string;
  client_id: Types.ObjectId;
  assignment_user_id: Types.ObjectId;
  assigned_by: Types.ObjectId;
  assigned_date: Date;
  type: string;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const clientAssignments = new Schema<IClientAssignment>(
  {
    id: { type: String },
    client_id: { type: ObjectId, ref: 'customers' },
    assignment_user_id: { type: ObjectId, ref: 'office_users' },
    assigned_by: { type: ObjectId, ref: 'office_users' },
    assigned_date: { type: Date },
    type: { type: String },
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
clientAssignments.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientAssignmentSchema = mongoose.model<IClientAssignment>(
  'customer_assignments',
  clientAssignments,
);
export { ClientAssignmentSchema };
