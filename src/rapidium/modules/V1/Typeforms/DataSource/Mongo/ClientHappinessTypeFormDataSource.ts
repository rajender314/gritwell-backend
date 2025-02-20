import { SyncClientHappiness }
    from '@basePath/Typeforms/Commands/SyncClientHappiness';
import { SyncTypeFormResonse }
    from '@basePath/Api/Commands/SyncTypeFormResonse';
import { UserDetails }
    from '@basePath/Typeforms/DataSource/Mongo/UserDetails';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
/**
 * class ClientHappinessTypeFormDataSource
 */
export default class ClientHappinessTypeFormDataSource {
    /**
       * sync ClientHappiness Typeform
       * @param {data}data
       */
    async sync(data: SyncClientHappiness) {
        let userProfileFields = data.userProfileFields;
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
            const user = await new UserDetails(typeformEmail).get();
            if (user && user != null) {
                const { first_name, last_name, email, phone } = user;
                userProfileFields = { first_name, last_name, email, phone };
                const syncTypeFormResponseCommand = new SyncTypeFormResonse({ body: data.response, userProfileFields, type_form_id: data.type_form_id, appointment_id: customerAppointmentId });
                return await new CommandFactory().getCommand(
                    syncTypeFormResponseCommand.path,
                    true,
                    syncTypeFormResponseCommand,
                );
            }
        }
    }
}
