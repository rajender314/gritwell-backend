import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

const Schema = mongoose.Schema;

interface ICustomerCards extends Document {
    user_id: Types.ObjectId;
    stripe_customer_id: string;
    stripe_card_id: string;
    card_brand: string;
    card_number: string;
    card_expiry_month: Number;
    card_expiry_year: Number;
    card_holder_name: string;
    is_default:Boolean;
    status:Boolean;
}

const customerCards = new Schema<ICustomerCards>(
    {
      user_id: {type: ObjectId, ref: 'users'},
      stripe_customer_id: {type: String, require: true},
      stripe_card_id: {type: String, require: true},
      card_brand: {type: String, require: true},
      card_number: {type: String, require: true},
      card_expiry_month: {type: Number, require: true},
      card_expiry_year: {type: Number, require: true},
      card_holder_name: {type: String, require: true},
      is_default: {type: Boolean, default: false},
      status: {type: Boolean, default: false},
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

const CustomerCardsSchema = mongoose.model<ICustomerCards>(
    'customer_cards',
    customerCards,
);

export {CustomerCardsSchema};
