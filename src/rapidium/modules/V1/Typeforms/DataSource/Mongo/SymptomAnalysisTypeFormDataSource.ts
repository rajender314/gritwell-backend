import {SyncSymptomAnalysis}
  from '@basePath/Typeforms/Commands/SyncSymptomAnalysis';
import {SyncTypeFormResonse}
  from '@basePath/Api/Commands/SyncTypeFormResonse';
import {UserDetails}
  from '@basePath/Typeforms/DataSource/Mongo/UserDetails';
import {CustomerSchema} from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
// import { FormResponseSchema } from "@basePath/Api/DataSource/Models/Schema/FormResponseSchema";
/**
 * class SymptomAnalysisTypeFormDataSource
 */
export default class SymptomAnalysisTypeFormDataSource {
  /**
       * sync HealthAssessment Typeform
       * @param {data}data
       */
  async sync(data: SyncSymptomAnalysis) {
    // data.response = await FormResponseSchema.findOne({ type: "msq" });

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
        const {first_name, last_name, email, phone, gender} = user;
        userData = {first_name, last_name, email, phone, gender};
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
                symptom_analysis_submitted: true,
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
