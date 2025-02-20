import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

const Schema = mongoose.Schema;

const officeUserSpecialists = new Schema(
    {
      id: {type: String},
      user_id: {type: ObjectId, ref: 'office_users'},
      specialists_id: {type: ObjectId, ref: 'specialists'},
    },
    {timestamps: true},
);
officeUserSpecialists.plugin(mongoosePaginate);
const OfficeUserSpecialistsSchema = mongoose.model(
    'office_user_specialists',
    officeUserSpecialists,
);
export {OfficeUserSpecialistsSchema};
