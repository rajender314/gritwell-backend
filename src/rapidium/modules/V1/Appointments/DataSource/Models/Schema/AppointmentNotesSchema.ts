import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';

interface IAppointmentNotes extends Document {
    id: string;
    client_id: Types.ObjectId;
    appointment_id: Types.ObjectId;
    title: string;
    description: string; 
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const notes = new Schema<IAppointmentNotes>(
    {
        id: { type: String },
        client_id: { type: ObjectId, ref: 'users', required: true },
        appointment_id: { type: ObjectId, ref: 'appointments', required: true },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
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
notes.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const AppointmentNotesSchema = mongoose.model<IAppointmentNotes>('customer_appointment_notes', notes);
export { AppointmentNotesSchema };
