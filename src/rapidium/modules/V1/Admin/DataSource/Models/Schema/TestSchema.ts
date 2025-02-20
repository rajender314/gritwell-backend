import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface ITest extends Document {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  type: string;
  link: string;
  uuid: string;
  status: boolean;
  is_deleted: boolean;
  deleted_at: Date | null;
  created_date: Date;
  create_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const test = new Schema<ITest>(
    {
      id: {type: String},
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      uuid: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      is_deleted: {
        type: Boolean,
        default: false,
      },
      deleted_at: {
        type: Date,
        default: null,
      },
      created_date: {type: Date},
      created_by: {
        type: ObjectId,
        ref: 'users',
      },
      last_modified_date: {type: Date},
      last_modified_by: {
        type: ObjectId,
        ref: 'users',
      },
    },
);
test.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const TestSchema = mongoose.model<ITest>('Test', test);
export {TestSchema};
