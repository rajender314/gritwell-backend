import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

interface ICustomerRecentActivityActions extends Document {
    action: string;
    message: string;
}
const Schema = mongoose.Schema;

const customerRecentActivityActions = new Schema<ICustomerRecentActivityActions>(
    {
        action: { type: String },
        message: { type: String },
    },
);

const CustomerRecentActivityActionsSchema = mongoose.model<ICustomerRecentActivityActions>('customer_recent_activity_actions', customerRecentActivityActions);
export { CustomerRecentActivityActionsSchema };
