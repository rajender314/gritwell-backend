import mongoose from 'mongoose';
import {Document} from 'mongoose';
const Schema = mongoose.Schema;

interface ISubscriptionPlans extends Document{
    _id: string;
    plan_type: string;
    plan_slug: string;
    plan_duration: string;
    duration_type: string,
    currency_type: string;
    plan_price: number;
    recurring_type: string;
    plan_description:{
        heading:string,
        subject:[string]
    };
    plan_video:{
        heading:string,
        video_url:string
    };
    status:boolean;
    price_id:string;
}

const subscriptionPlans = new Schema<ISubscriptionPlans>(
    {
      plan_type: {type: String},
      plan_slug: {type: String},
      plan_duration: {type: String},
      duration_type: {type: String},
      currency_type: {type: String},
      plan_price: {type: Number},
      recurring_type: {type: String},
      plan_description: {
        heading: {type: String},
        subject: [{type: String}],
      },
      plan_video: {
        heading: {type: String},
        video_url: {type: String},
      },
      status: {type: Boolean},
      price_id: {type: String},
    }, {
      timestamps: true,
    },
);

const SubscriptionPlansSchema = mongoose.model<ISubscriptionPlans>(
    'subscription_plans',
    subscriptionPlans,
);
export {SubscriptionPlansSchema};
