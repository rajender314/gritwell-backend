import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

interface IRecentActivity extends Document {
    collection_id: Types.ObjectId;
    client_id: Types.ObjectId;
    client_info: any,
    collection_name: string;
    action: string;
    message: string;
    is_internal: Boolean;
    collection_payload: any;
    created_date: Date;
    created_by: Types.ObjectId;
    created_info: any;
}

const Schema = mongoose.Schema;
const recentActivities = new Schema<IRecentActivity>(
    {
      collection_id: {type: ObjectId, ref: 'users'},
      client_id: {type: ObjectId, ref: 'users'},
      client_info: {},
      collection_name: {type: String},
      action: {type: String},
      message: {type: String},
      is_internal: {type: Boolean, default: false},
      collection_payload: {},
      created_info: {},
      created_by: {
        type: ObjectId,
        ref: 'users',
      },
      created_date: {type: Date},
    },
);
const CustomerRecentActivitySchema = mongoose.model<IRecentActivity>(
    'customer_recent_activities',
    recentActivities,
);
export {CustomerRecentActivitySchema};
