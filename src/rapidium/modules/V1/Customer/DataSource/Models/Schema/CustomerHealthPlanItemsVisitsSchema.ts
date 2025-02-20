import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const Schema = mongoose.Schema;

interface ICustomerHealthPlanItemsVisits extends Document {
    id: string;
    client_id: Types.ObjectId;
    health_plan_id: Types.ObjectId;
    healthplan_item_id: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const healthPlanItemsVisits = new Schema<ICustomerHealthPlanItemsVisits>({
  id: {type: String},
  client_id: {type: ObjectId, ref: 'users', required: true},
  health_plan_id: {
    type: ObjectId,
    ref: 'customer_health_plans',
    required: true,
  },
  healthplan_item_id: {type: ObjectId, required: true},
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

const ClientHealthPlanItemsVisitsSchema =
  mongoose.model<ICustomerHealthPlanItemsVisits>(
      'customer_healthplan_items_visits',
      healthPlanItemsVisits,
  );
export {ClientHealthPlanItemsVisitsSchema};

