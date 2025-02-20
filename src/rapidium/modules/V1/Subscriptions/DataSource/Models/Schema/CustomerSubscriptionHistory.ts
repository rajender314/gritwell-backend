import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const Schema = mongoose.Schema;

interface ICustomerSubscriptionHistory extends Document {
  user_id: Types.ObjectId;
  subscription_plan_id: Types.ObjectId;
  amount: number;
  transaction_type: string;
  plan_duration: number;
  stripe_customer_id: string;
  stripe_card_id: string;
  stripe_subscription_schedule_id: string;
  stripe_subscription_id: string;
  stripe_status: string;
  subscription_start_date: Date;
  subscription_end_date: Date;
  subscription_status: string;
  appointment_id: Types.ObjectId;
  payment_status: string;
  order_id: String;
  payment_status_id: Types.ObjectId;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const CustomerSubscriptionHistory = new Schema<ICustomerSubscriptionHistory>(
    {
      user_id: {type: ObjectId, ref: 'users'},
      subscription_plan_id: {type: ObjectId, ref: 'subscription_plans'},
      amount: {type: Number},
      transaction_type: {type: String},
      plan_duration: {type: Number},
      stripe_customer_id: {type: String},
      stripe_card_id: {type: String},
      stripe_subscription_schedule_id: {type: String},
      stripe_subscription_id: {type: String},
      stripe_status: {type: String},
      subscription_start_date: {type: Date},
      subscription_end_date: {type: Date},
      subscription_status: {type: String},
      appointment_id: {type: ObjectId, ref: 'appointments'},
      payment_status: {type: String},
      order_id: {type: String},
      payment_status_id: {type: ObjectId, ref: 'payment_statuses'},
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
    },
);

const CustomerSubscriptionHistorySchema =
  mongoose.model<ICustomerSubscriptionHistory>(
      'customer_subscription_histories',
      CustomerSubscriptionHistory,
  );

export {CustomerSubscriptionHistorySchema};
