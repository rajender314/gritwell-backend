import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';

interface IClientHealthPlan extends Document {
    id: string;
    client_id: Types.ObjectId;
    appointment_id: Types.ObjectId;
    appointment_type: string;
    name: string;
    type: string;
    // is_submitted: boolean;
    // is_active: boolean;
    // plan_status: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    submitted_date: Date;
    submitted_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const healthPlan = new Schema<IClientHealthPlan>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        appointment_id: { type: ObjectId, ref: 'appointments', default: null },
        appointment_type: { type: String },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        // is_submitted: {
        //     type: Boolean,
        //     default: false
        // },
        // is_active: {
        //     type: Boolean,
        //     default: true
        // },
        // plan_status: {
        //     type: ObjectId,
        //     ref: 'customer_statuses',
        // },
        submitted_date: { type: Date, default: null },
        submitted_by: {
            type: ObjectId,
            ref: 'users',
            default: null
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
healthPlan.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientHealthPlanSchema = mongoose.model<IClientHealthPlan>('customer_health_plans', healthPlan);
export { ClientHealthPlanSchema };
