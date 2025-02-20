import mongoose from 'mongoose';

import {Document} from 'mongoose';

interface ITimeZone extends Document {
    id: string;
    name: string;
    code: string;
    offset_value: string;
    label: string;
    value: string;
    utc_offset: string;
    gmt_offset: string;
    status: boolean;
}

const Schema = mongoose.Schema;

const timeZone = new Schema<ITimeZone>(
    {
      id: {type: String},
      name: {type: String},
      label: {type: String},
      code: {type: String},
      offset_value: {type: String},
      utc_offset: {type: String},
      gmt_offset: {type: String},
      status: {type: Boolean},
    },
    {timestamps: true},
);

const TimeZoneSchema = mongoose.model<ITimeZone>('time_zone', timeZone);
export {TimeZoneSchema};
