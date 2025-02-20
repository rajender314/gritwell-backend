import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';


interface IGoal extends Document {
    id: string;
    client_id: Types.ObjectId;
    goal_id: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const goals = new Schema<IGoal>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        goal_id: { type: ObjectId, ref: 'goals', required: true },
        created_date: { type: Date },
        created_by: {
            type: ObjectId,
            ref: 'users',
        },
        last_modified_date: { type: Date },
        last_modified_by: {
            type: ObjectId,
            ref: 'users',
        },
    },
);
goals.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientGoalsSchema = mongoose.model<IGoal>('cutomer_goals', goals);
export { ClientGoalsSchema };
