import mongoose from 'mongoose';
import {Document, Types} from 'mongoose';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import diffHistory
  from '@rapCoreLibraries/DiffHistory';

interface IGoal extends Document {
  id: string;
  name: string;
  uuid: string;
  status: boolean;
  is_deleted: boolean;
  deleted_at: Date | null;
  created_date: Date;
  created_by: Types.ObjectId;
  last_modified_date: Date;
  last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const goal = new Schema<IGoal>(
    {
      id: {type: String},
      name: {
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
goal.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const GoalSchema = mongoose.model<IGoal>('Goal', goal);
export {GoalSchema};
