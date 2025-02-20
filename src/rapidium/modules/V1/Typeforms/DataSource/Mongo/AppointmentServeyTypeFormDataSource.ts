import { AppointmentServey }
    from '@basePath/Typeforms/Commands/AppointmentServey';
import { SyncTypeFormResonse }
    from '@basePath/Api/Commands/SyncTypeFormResonse';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { UserDetails }
    from '@basePath/Typeforms/DataSource/Mongo/UserDetails';
import { ValidateAppointment }
    from
    '@basePath/Appointments/DataSource/Mongo/ValidateAppointment';
import { ObjectId } from "@rapCore/src/Mongodb/Types";
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
let environment = process.env;
/**
 * class AppointmentServeyTypeFormDataSource
 */
export default class AppointmentServeyTypeFormDataSource {
    /**
       * sync AppointmentServey Typeform
       * @param {data}data
       */
    async sync(data: AppointmentServey) {
        let userProfileFields = data.userProfileFields;
        const typeFormId = data.response.form_response.form_id;
        const typeformEmail = data.response &&
            data.response.form_response &&
            data.response.form_response.hidden &&
            data.response.form_response.hidden.customer_email ?
            data.response.form_response.hidden.customer_email : '';
        const customerAppointmentId = data.response &&
            data.response.form_response &&
            data.response.form_response.hidden &&
            data.response.form_response.hidden.appointment ?
            data.response.form_response.hidden.appointment : '';

        if (typeformEmail && customerAppointmentId) {
            await new ValidateAppointment(customerAppointmentId).validate();
            const user = await new UserDetails(typeformEmail).get();
            if (user && user != null) {
                const { first_name, last_name, email, phone } = user;
                userProfileFields = { first_name, last_name, email, phone };
                const syncTypeFormResponseCommand = new SyncTypeFormResonse({ body: data.response, userProfileFields, type_form_id: typeFormId, appointment_id: customerAppointmentId });
                const typeForm = await new CommandFactory().getCommand(
                    syncTypeFormResponseCommand.path,
                    true,
                    syncTypeFormResponseCommand,
                );
                if (typeForm.submitted) {
                    if (typeFormId === environment.TYPE_FORM_PRE_APPOINTMENT) {
                        await AppointmentSchema.findByIdAndUpdate(ObjectId(customerAppointmentId), { is_pre_session_servery_submitted: true });
                    }
                    if (typeFormId === environment.TYPE_FORM_POST_APPOINTMENT) {
                        await AppointmentSchema.findByIdAndUpdate(ObjectId(customerAppointmentId), { is_post_session_servery_submitted: true });
                    }
                }
                return true;
            }
        }
    }
}
