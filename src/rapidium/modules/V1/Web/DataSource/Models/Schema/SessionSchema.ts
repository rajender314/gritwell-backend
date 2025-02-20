import * as mongoose from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

const Schema = mongoose.Schema;

const sessions = new Schema(
    {
      token: {type: String},
      offset: Number,
      logged_in: Boolean,
      date_created: {type: Date},
      date_modified: {type: Date, default: Date.now},
      last_accessed_at: {type: Date},
      logged_in_as: String,
      user_agent: String,
      refresh_token: String,
      jwt_token: String,
      access_token: String,
      prev_access_token: String,
      user_mongo_id: {type: ObjectId, ref: 'User'},
    },
    {timestamps: true, versionKey: false},
);

const SessionSchema = mongoose.model('Sessions', sessions);
export {SessionSchema};
