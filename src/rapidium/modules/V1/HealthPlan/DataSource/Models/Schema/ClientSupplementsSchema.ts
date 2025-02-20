import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';

interface ISupplement extends Document {
    id: string;
    client_id: Types.ObjectId;
    health_plan_id: Types.ObjectId;
    supplement_id: Types.ObjectId; 
    description: string; 
    quantity: number;
    unit_id: Types.ObjectId;
    duration: number;
    status: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const supplements = new Schema<ISupplement>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        health_plan_id: { type: ObjectId, ref: 'customer_health_plans', required: true },
        supplement_id: { type: ObjectId, ref: 'supplements', required: true }, 
        description: {
            type: String,
            required: true,
        }, 
        quantity: {
            type: Number,
            required: true,
        },
        unit_id: { type: ObjectId, ref: 'customer_statuses', required: true },
        duration: {
            type: Number,
            required: true,
        },
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
supplements.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientSupplementsSchema = mongoose.model<ISupplement>('cutomer_supplements', supplements);
export { ClientSupplementsSchema };
