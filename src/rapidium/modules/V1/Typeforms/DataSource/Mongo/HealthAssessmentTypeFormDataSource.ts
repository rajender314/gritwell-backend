import { SyncHealthAssessment }
    from '@basePath/Typeforms/Commands/SyncHealthAssessment';
import { UserDetails }
    from '@basePath/Typeforms/DataSource/Mongo/UserDetails';
import { SyncTypeFormResonse }
    from '@basePath/Api/Commands/SyncTypeFormResonse';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { CustomerSchema } from "@basePath/Customer/DataSource/Models/Schema/CustomerSchema";
import { ObjectId } from "@rapCore/src/Mongodb/Types";
let environment = process.env;
/**
 * class HealthAssessmentTypeFormDataSource
 */
export default class HealthAssessmentTypeFormDataSource {
    /**
       * sync HealthAssessment Typeform
       * @param {data}data
       */
    async sync(data: SyncHealthAssessment) {
        const userProfileFields = data.userProfileFields;
        const type_form_id = data.type_form_id;
        const answers = data.response.form_response.answers;
        if (answers.length) {
            const typeFormEmail = answers.filter(function (object) {
                return object.field.id === environment.HA_EMAIL;
            });
            if (typeFormEmail.length && typeFormEmail[0].email) {
                const user = await new UserDetails(typeFormEmail[0].email).get();
                if (!user) {
                    const syncTypeFormResponseCommand = new SyncTypeFormResonse({ body: data.response, userProfileFields, type_form_id });
                    const typeForm = await new CommandFactory().getCommand(
                        syncTypeFormResponseCommand.path,
                        true,
                        syncTypeFormResponseCommand,
                    );
                    if (typeForm.submitted) {
                        await CustomerSchema.findOneAndUpdate({ user_id: ObjectId(typeForm.user._id) }, { health_assessment_submitted: true });
                    }
                    return true;
                } else {
                    return 'User already submitted Health Assessment Form';
                }
            }
        }
    }
}
