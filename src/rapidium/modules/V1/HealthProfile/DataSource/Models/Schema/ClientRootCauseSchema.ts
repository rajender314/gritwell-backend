import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';


interface IRootCause extends Document {
    id: string;
    client_id: Types.ObjectId;
    rootcause_id: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const rootcauses = new Schema<IRootCause>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        rootcause_id: { type: ObjectId, ref: 'rootcauses', required: true },
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
rootcauses.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientRootCauseSchema = mongoose.model<IRootCause>('cutomer_rootcauses', rootcauses);
export { ClientRootCauseSchema };
