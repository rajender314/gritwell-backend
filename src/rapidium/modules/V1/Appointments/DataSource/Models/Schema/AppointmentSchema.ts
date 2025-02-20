import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import diffHistory
    from '@rapCoreLibraries/DiffHistory';

enum AppointmentType {
    INITIAL_APPOINTMENT = "INITIAL_APPOINTMENT",
    FOLLOWUP_APPOINTMENT = "FOLLOWUP_APPOINTMENT",
}
interface IAppointment extends Document {
    client_id: Types.ObjectId;
    user_id: Types.ObjectId;
    start_date: Date;
    end_date: Date;
    start_time: string;
    end_time: string;
    name: string;
    acuity_appointment_id: string;
    acuity_calender_id: string;
    acuity_user_email: string;
    acuity_client_email: string;
    acuity_calendar_time_zone: string;
    acuity_confirmation_page: string;
    notes: string;
    status: Types.ObjectId;
    appointment_type: AppointmentType;
    cncl_r_rshl_payment_done: Boolean;
    is_pre_session_servery_submitted: Boolean;
    is_post_session_servery_submitted: Boolean;
    client_attendance_submitted: boolean;
    created_date: Date;
    created_by: Types.ObjectId;
    last_modified_date: Date;
    last_modified_by: Types.ObjectId;
}

const Schema = mongoose.Schema;

const appointment = new Schema<IAppointment>(
    {
        client_id: { type: ObjectId, ref: 'users', required: true },
        user_id: { type: ObjectId, ref: 'users', required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        start_time: { type: String, required: true },
        end_time: { type: String, required: true },
        name: { type: String, required: true },
        acuity_appointment_id: { type: String, required: true },
        acuity_calender_id: { type: String, required: true },
        acuity_user_email: { type: String, required: true },
        acuity_client_email: { type: String, required: true },
        acuity_calendar_time_zone: { type: String, required: true },
        acuity_confirmation_page: { type: String, required: true },
        notes: { type: String },
        status: { type: ObjectId, ref: 'appointment_statuses', required: true },
        appointment_type: {
            type: String,
            enum: AppointmentType
        },
        cncl_r_rshl_payment_done: { type: Boolean, default: false },
        is_pre_session_servery_submitted: { type: Boolean, default: false },
        is_post_session_servery_submitted: { type: Boolean, default: false },
        client_attendance_submitted: { type: Boolean, default: false },
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
    }
);
appointment.plugin(diffHistory.plugin, { omit: ['last_modified_date'] });
const AppointmentSchema = mongoose.model<IAppointment>('Appointment', appointment);
export { AppointmentSchema };
