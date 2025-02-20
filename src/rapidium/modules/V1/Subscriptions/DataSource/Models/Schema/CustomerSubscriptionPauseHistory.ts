import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const Schema = mongoose.Schema;

interface ICustomerSubscriptionPauseHistory extends Document {
  action: string;
  user_id: Types.ObjectId;
  stripe_subscription_id: string;
  stripe_subscription_object: Object;
  stripe_status: string;
  subscription_status: string;
  paused_on: Date;
  resumed_on: Date;
  canceled_on: Date;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const CustomerSubscriptionPauseHistory =
  new Schema<ICustomerSubscriptionPauseHistory>(
      {
        action: {type: String},
        user_id: {type: ObjectId, ref: 'users'},
        stripe_subscription_id: {type: String},
        stripe_subscription_object: {type: Object},
        stripe_status: {type: String},
        subscription_status: {type: String},
        paused_on: {type: Date},
        resumed_on: {type: Date},
        canceled_on: {type: Date},
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

const CustomerSubscriptionPauseHistorySchema =
  mongoose.model<ICustomerSubscriptionPauseHistory>(
      'customer_subscription_pause_histories',
      CustomerSubscriptionPauseHistory,
  );
export {CustomerSubscriptionPauseHistorySchema};
