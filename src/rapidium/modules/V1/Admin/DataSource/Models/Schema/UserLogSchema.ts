import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const userlog = new Schema(
    {
      user_id: {type: String},
      login_time: {type: Date},
      logout_time: {type: Date},
      useragent: {type: Object},
    },
    {timestamps: true},
);
userlog.plugin(mongoosePaginate);
const UserLogSchema = mongoose.model('UserLog', userlog);
export {UserLogSchema};
