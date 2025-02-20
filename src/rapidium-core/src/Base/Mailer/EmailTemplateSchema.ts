import mongoose from 'mongoose';
import {Document} from 'mongoose';
const Schema = mongoose.Schema;

interface IEmailTemplate extends Document {
    _id: string;
    name: string;
    body: string;
    subject: string;
    from_name: string;
    from_email: string;
    db_name: string;
    status: boolean;

}

const emailTemplate = new Schema<IEmailTemplate>(
    {
      name: {type: String},
      body: {type: String},
      subject: {type: String},
      from_name: {type: String},
      from_email: {type: String},
      db_name: {type: String},
      status: {type: Boolean},
    },
    {timestamps: true},
);

const EmailTemplateSchema = mongoose.model<IEmailTemplate>(
    'email_template',
    emailTemplate,
);
export {EmailTemplateSchema};
