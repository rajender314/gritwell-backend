import {SyncIntake}
  from '@basePath/Typeforms/Commands/SyncIntake';
import {SyncTypeFormResonse}
  from '@basePath/Api/Commands/SyncTypeFormResonse';
import {UserDetails}
  from '@basePath/Typeforms/DataSource/Mongo/UserDetails';
import {CustomerSchema} from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
/**
 * class IntakeTypeFormDataSource
 */
export default class IntakeTypeFormDataSource {
  /**
       * sync HealthAssessment Typeform
       * @param {data}data
       */
  async sync(data: SyncIntake) {
    const userProfileFields = data.userProfileFields;
    let userData = {};
    const type_form_id = data.type_form_id;
    const typeformEmail = data.response &&
            data.response.form_response &&
            data.response.form_response.hidden &&
            data.response.form_response.hidden.customer_email ?
            data.response.form_response.hidden.customer_email : '';
    if (typeformEmail) {
      const user = await new UserDetails(typeformEmail).get();
      if (user && user != null) {
        const {first_name, last_name, email, phone, address, state, dob, ethnicity, height, weight} = user;
        userData = {first_name, last_name, email, phone, address, state, dob, ethnicity, height, weight};
        const syncTypeFormResponseCommand = new SyncTypeFormResonse({body: data.response, userProfileFields, type_form_id, userData});
        const typeForm = await new CommandFactory().getCommand(
            syncTypeFormResponseCommand.path,
            true,
            syncTypeFormResponseCommand,
        );
        if (typeForm.submitted) {
          await CustomerSchema.findOneAndUpdate(
              {user_id: ObjectId(user._id)},
              {
                intake_submitted: true,
                current_health_journey_status:
                          'intake_and_symptom_analysis',
              },
          );
        }
        return true;
      }
    }
  }
}
