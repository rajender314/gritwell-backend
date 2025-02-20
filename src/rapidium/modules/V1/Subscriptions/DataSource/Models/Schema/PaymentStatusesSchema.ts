import mongoose from 'mongoose';
import {Document} from 'mongoose';

interface IPaymentStatus extends Document {
    name: string;
    code: string;
    color: string;
}

const Schema = mongoose.Schema;
const paymentStatuses = new Schema<IPaymentStatus>(
    {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      }
    },
);

const PaymentStatusesSchema = mongoose.model<IPaymentStatus>(
    'payment_statuses',
    paymentStatuses,
);
export {PaymentStatusesSchema};
