import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface IPhasesOfCare extends Document {
  id: string;
  client_id: Types.ObjectId;
  health_plan_id: Types.ObjectId;
  name: string;
  description: string;
  status: Types.ObjectId;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const phasesOfCare = new Schema<IPhasesOfCare>(
  {
    id: { type: String },
    client_id: { type: ObjectId, ref: 'users', required: true },
    health_plan_id: { type: ObjectId, ref: 'customer_health_plans', required: true },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: { type: ObjectId, ref: 'customer_statuses', required: true },
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
);
phasesOfCare.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientPhasesOfCareSchema = mongoose.model<IPhasesOfCare>('customer_phases_of_care', phasesOfCare);
export { ClientPhasesOfCareSchema };
