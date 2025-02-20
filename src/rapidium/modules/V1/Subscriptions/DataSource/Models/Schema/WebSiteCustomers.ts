import mongoose from 'mongoose';
import {Document} from 'mongoose';
const Schema = mongoose.Schema;

interface IWebSiteCustomers extends Document {
  email: string;
  name: string;
  address: Object;
  phone: string;
  created_date: Date;
  last_modified_date: Date;
}

const webSiteCustomers = new Schema<IWebSiteCustomers>({
  email: {type: String},
  name: {type: String},
  address: {type: Object},
  phone: {type: String},
  created_date: {type: Date},
  last_modified_date: {type: Date},
});
const WebSiteCustomersSchema = mongoose.model<IWebSiteCustomers>(
    'website_customers',
    webSiteCustomers,
);

export {WebSiteCustomersSchema};
