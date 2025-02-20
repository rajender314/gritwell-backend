import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

const Schema = mongoose.Schema;

const officeUserWeekdays = new Schema(
    {
      id: {type: String},
      user_id: {type: ObjectId, ref: 'office_users'},
      weekdays_id: {type: ObjectId, ref: 'week_days'},
    },
    {timestamps: true},
);
officeUserWeekdays.plugin(mongoosePaginate);
const OfficeUserWeekDaysSchema = mongoose.model(
    'office_user_week_days',
    officeUserWeekdays,
);
export {OfficeUserWeekDaysSchema};
