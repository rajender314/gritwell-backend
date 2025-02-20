import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

const Schema = mongoose.Schema;
const acuityAppointmentResponseSchema = new Schema(
    {
      appointment_id: {type: ObjectId, ref: 'appointments'},
      response: {type: Object},
    },
    {timestamps: true},
);

acuityAppointmentResponseSchema.plugin(mongoosePaginate);
const AcuityAppointmentResponseSchema = mongoose.model(
    'acuity_appointments_response',
    acuityAppointmentResponseSchema,
);
export {AcuityAppointmentResponseSchema};
