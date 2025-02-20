import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

interface IImportExportLog extends Document {
    id: string;
    action: string;
    collectionName: string;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const importExportLog = new Schema<IImportExportLog>(
    {
        id: { type: String },
        action: {
            type: String,
            required: true,
        },
        collectionName: {
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
const ImportExportLogSchema = mongoose.model<IImportExportLog>('ImportExportLog', importExportLog);
export { ImportExportLogSchema };
