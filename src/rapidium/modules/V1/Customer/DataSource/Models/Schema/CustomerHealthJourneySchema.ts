import mongoose from 'mongoose';
import {Document} from 'mongoose';
const Schema = mongoose.Schema;

interface ICustomerHealthJourney extends Document {
    name: string;
    code: string;
    order: number;
    status: boolean;
}

const customerHealthJourney = new Schema<ICustomerHealthJourney>({
  name: {type: String},
  code: {type: String},
  order: {type: Number},
  status: {type: Boolean},
});

const CustomerHealthJourneySchema = mongoose.model<ICustomerHealthJourney>(
    'customer_health_journeys',
    customerHealthJourney,
);
export {CustomerHealthJourneySchema};
