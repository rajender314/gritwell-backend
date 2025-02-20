import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const Schema = mongoose.Schema;

interface IWebSiteSubscriptionDetails extends Document {
    website_customer_id: Types.ObjectId;
    subscription_plan_id: Types.ObjectId;
    amount: number;
    transaction_type: string;
    plan_duration: number;
    stripe_subscription_id: string;
    subscription_start_date: Date;
    subscription_end_date: Date;
    subscription_status: string;
    stripe_response: Object;
    created_date: Date;
    last_modified_date: Date;
}

const webSiteSubscriptionDetails = new Schema<IWebSiteSubscriptionDetails>({
  website_customer_id: {type: ObjectId, ref: 'website_customers'},
  subscription_plan_id: {type: ObjectId, ref: 'subscription_plans'},
  amount: {type: Number},
  transaction_type: {type: String},
  plan_duration: {type: Number},
  stripe_subscription_id: {type: String},
  subscription_start_date: {type: Date},
  subscription_end_date: {type: Date},
  subscription_status: {type: String},
  stripe_response: {type: Object},
  created_date: {type: Date},
  last_modified_date: {type: Date},
});

const WebSiteSubscriptionDetailsSchema =
  mongoose.model<IWebSiteSubscriptionDetails>(
      'website_subscriptions_details',
      webSiteSubscriptionDetails,
  );

export {WebSiteSubscriptionDetailsSchema};
