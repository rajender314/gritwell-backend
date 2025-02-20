import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import diffHistory from '@rapCoreLibraries/DiffHistory';

interface ICustomer extends Document {
  user_id: Types.ObjectId;
  first_name: string;
  last_name: string;
  phone: string;
  gwc_client_id: string;
  address: string;
  state: string;
  dob: string;
  ethnicity: string;
  gender: string;
  height: string;
  weight: string;
  img_file_name: string;
  img_unique_name: string;
  health_assessment_submitted: boolean;
  intake_submitted: boolean;
  symptom_analysis_submitted: boolean;
  stripe_customer_id: string;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
  stripe_subscription_id: string;
  current_health_journey_status: string;
}

const Schema = mongoose.Schema;
const customers = new Schema<ICustomer>({
  user_id: {type: ObjectId, ref: 'users'},
  first_name: {type: String},
  last_name: {type: String},
  is_password_updated: {type: Boolean},
  phone: {type: String},
  gwc_client_id: {type: String},
  address: {type: String},
  state: {type: String},
  dob: {type: String},
  ethnicity: {type: String},
  gender: {type: String},
  height: {type: String},
  weight: {type: String},
  img_file_name: {type: String},
  img_unique_name: {type: String},
  health_assessment_submitted: {type: Boolean, default: false},
  intake_submitted: {type: Boolean, default: false},
  symptom_analysis_submitted: {type: Boolean, default: false},
  customer_subscription_history_id: {
    type: ObjectId,
    ref: 'customer_subscription_histories',
  },
  stripe_subscription_schedule_id: {type: String},
  stripe_subscription_id: {type: String},
  subscription_plan_id: {type: ObjectId, ref: 'subscription_plans'},
  stripe_subscription_object: {type: JSON},
  subscription_start_date: {type: Date},
  subscription_end_date: {type: Date},
  subscription_payment_status: {type: String},
  stripe_status: {type: String},
  stripe_customer_id: {type: String},
  subscription_status: {type: String},
  payments_count: {type: Number},
  location: {type: String, default: 'San Francisco'},
  language: {type: String, default: 'English'},
  current_health_journey_status: {type: String},
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
customers.plugin(diffHistory.plugin, {omit: ['last_modified_date']});
const CustomerSchema = mongoose.model<ICustomer>('customer', customers);
export {CustomerSchema};
