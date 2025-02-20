import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const emailController = new Schema(
    {
      to: {type: String},
      from: {type: String},
      subject: {type: String},
      html: {type: String},
      status: {type: Boolean, default: true},
    },
    {
      timestamps: true,
    },
);
emailController.plugin(mongoosePaginate);
const EmailControllerSchema = mongoose.model(
    'EmailController',
    emailController,
);
export {EmailControllerSchema};
