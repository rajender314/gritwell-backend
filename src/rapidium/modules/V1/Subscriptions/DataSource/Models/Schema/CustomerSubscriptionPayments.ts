import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const Schema = mongoose.Schema;

interface ICustomerSubscriptionPayments extends Document {
  amount: number;
  stripe_subscription_id: string;
  stripe_webHook_action: string;
  stripe_webHook_object: Object;
  stripe_status: string;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const CustomerSubscriptionPayments = new Schema<ICustomerSubscriptionPayments>(
    {
      amount: {type: Number},
      stripe_subscription_id: {type: String},
      stripe_webHook_action: {type: String},
      stripe_webHook_object: {type: Object},
      stripe_status: {type: String},
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

const CustomerSubscriptionPaymentsSchema =
  mongoose.model<ICustomerSubscriptionPayments>(
      'customer_subscription_payments',
      CustomerSubscriptionPayments,
  );

export {CustomerSubscriptionPaymentsSchema};
