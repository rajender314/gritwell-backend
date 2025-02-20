import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
interface ISettings extends Document { 
  object_key: string;
  object_value: string;
}
const Schema = mongoose.Schema;

const settings = new Schema(
    {
      object_key: {type: String},
      object_value: {type: String},
      // stop_outgoing_emails: { type: Boolean, },
    },
    {
      timestamps: true,
    },
);
settings.plugin(mongoosePaginate);
const SettingsSchema = mongoose.model<ISettings>('Setting', settings);
export {SettingsSchema};
