import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const logs = new Schema(
    {
      name: {type: String},
      table_name: {type: String},
      table_id: {type: String},
      action: {type: String},
      params: {type: String},
      response: {type: String},
      description: {type: String},
    },
    {timestamps: true},
);
logs.plugin(mongoosePaginate);
const LogSchema = mongoose.model('Log', logs);
export {LogSchema};
