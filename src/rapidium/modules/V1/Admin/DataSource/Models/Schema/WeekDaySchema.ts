import mongoose from 'mongoose';
import {Document} from 'mongoose';

interface IWeekDay extends Document {
    id: string;
    name: string;
    code: string;
    status: boolean;
}

const Schema = mongoose.Schema;

const weekDay = new Schema<IWeekDay>(
    {
      id: {type: String},
      name: {type: String},
      code: {type: String},
      status: {type: Boolean},
    },
    {timestamps: true},
);

const WeekDaySchema = mongoose.model<IWeekDay>('week_day', weekDay);
export {WeekDaySchema};
