import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';

interface ITest extends Document {
    id: string;
    client_id: Types.ObjectId;
    health_plan_id: Types.ObjectId;
    frequency_id: Types.ObjectId;
    test_id: Types.ObjectId; 
    description: string; 
    status: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const tests = new Schema<ITest>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        health_plan_id: { type: ObjectId, ref: 'customer_health_plans', required: true },
        test_id: { type: ObjectId, ref: 'tests', required: true }, 
        description: {
            type: String,
            required: true,
        }, 
        frequency_id: { type: ObjectId, ref: 'frequencies', required: true },
        status: { type: ObjectId, ref: 'customer_statuses', required: true },
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
tests.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientTestsSchema = mongoose.model<ITest>('customer_tests', tests);
export { ClientTestsSchema };
