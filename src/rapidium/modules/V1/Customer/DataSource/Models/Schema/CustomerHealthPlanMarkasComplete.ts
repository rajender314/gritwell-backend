import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const Schema = mongoose.Schema;

interface IHealthPlanMarkasComplete extends Document {
    id: string;
    client_id: Types.ObjectId;
    healthplan_item_type: string;
    healthplan_item_id: string;
    mark_as_complete_date: Date;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const healthPlanMarkasComplete = new Schema<IHealthPlanMarkasComplete>({
  id: {type: String},
  client_id: {type: ObjectId, ref: 'users', required: true},
  healthplan_item_type: {type: String, required: true},
  healthplan_item_id: {type: ObjectId, required: true},
  mark_as_complete_date: {type: Date, required: true},
  created_date: {type: Date},
  created_by: {
    type: ObjectId,
    ref: 'users',
  },
  last_modified_date: {type: Date},
  last_modified_by: {
    type: ObjectId,
    ref: 'users',
  },
});

const ClientHealthPlanItemMarkasCompleteSchema =
  mongoose.model<IHealthPlanMarkasComplete>(
      'customer_healthplan_markascompletes',
      healthPlanMarkasComplete,
  );
export {ClientHealthPlanItemMarkasCompleteSchema};
