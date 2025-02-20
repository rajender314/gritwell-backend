import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';


interface ICoreDysfunction extends Document {
    id: string;
    client_id: Types.ObjectId;
    coredysfunction_id: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const coredysfunctions = new Schema<ICoreDysfunction>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        coredysfunction_id: { type: ObjectId, ref: 'coredysfunctions', required: true },
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
coredysfunctions.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientCoreDysfunctionSchema = mongoose.model<ICoreDysfunction>('cutomer_coredysfunctions', coredysfunctions);
export { ClientCoreDysfunctionSchema };
