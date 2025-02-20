import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;
const forgotToken = new Schema(
    {
      token_id: {type: String},
      email: {type: String},
      user_id: {type: String},
      request_type: {type: String},
    },
    {timestamps: true},
);
forgotToken.plugin(mongoosePaginate);
const ForgotTokenSchema = mongoose.model('forgot_token', forgotToken);
export {ForgotTokenSchema};
