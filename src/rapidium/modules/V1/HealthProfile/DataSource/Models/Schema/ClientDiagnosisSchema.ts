import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';


interface IDiagnosis extends Document {
    id: string;
    client_id: Types.ObjectId;
    diagnosis_id: Types.ObjectId;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const diagnoses = new Schema<IDiagnosis>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        diagnosis_id: { type: ObjectId, ref: 'diagnoses', required: true },
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
diagnoses.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const ClientDiagnosisSchema = mongoose.model<IDiagnosis>('cutomer_diagnoses', diagnoses);
export { ClientDiagnosisSchema };
