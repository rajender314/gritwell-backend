import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';

import { HealthPlanType } from '@basePath/HealthPlan/Interfaces/IHealthPlan';

interface IInternalNotes extends Document {
    id: string;
    client_id: Types.ObjectId;
    health_plan_id: Types.ObjectId;
    type: string;
    notes: string;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const internalNotes = new Schema<IInternalNotes>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        health_plan_id: { type: ObjectId, ref: 'customer_health_plans', required: true },
        type: {
            type: String,
            required: true,
            enum: HealthPlanType,
        },
        notes: {
            type: String,
            required: true,
        },
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
internalNotes.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientInternalNotesSchema = mongoose.model<IInternalNotes>('customer_internal_notes', internalNotes);
export { ClientInternalNotesSchema };
