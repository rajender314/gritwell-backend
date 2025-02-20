import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

interface IStripePaymentResponses extends Document {
    customer_subscription_history_id: Types.ObjectId;
    response: Object;
}
const Schema = mongoose.Schema;
const stripePaymentResponses = new Schema<IStripePaymentResponses>({
  customer_subscription_history_id: {
    type: ObjectId,
    ref: 'customer_subscription_histories',
  },
  response: {type: Object},
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

const StripePaymentResponsesSchema = mongoose.model<IStripePaymentResponses>(
    'stripe_payments_responses',
    stripePaymentResponses,
);
export {StripePaymentResponsesSchema};
