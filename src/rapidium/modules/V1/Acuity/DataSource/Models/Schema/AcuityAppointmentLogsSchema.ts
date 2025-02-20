import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const acuityAppointmentLogs = new Schema(
    {
        action: {type: String},
        params: {type: Object},
        response: {type: Object},
    },
    {timestamps: true},
);


const AcuityAppointmentLogsSchema = mongoose.model('acuity_appointments_logs', acuityAppointmentLogs);
export {AcuityAppointmentLogsSchema};