import {HistoricalTests}
  from '@basePath/OfficeClients/Commands/HistoricalTests';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import {QuestionsSchema}
  from '@basePath/OfficeClients/DataSource/Models/Schema/QuestionsSchema';
import {ClientAnswersSchema}
  from '@basePath/OfficeClients/DataSource/Models/Schema/ClientAnswersSchema';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
/**
 * class HistoricalTestsDataSource
 */
export default class HistoricalTestsDataSource {
  /**
    * @param {data} data
   * @return {Object}
   */
  async getTest(data: HistoricalTests) {
    try {
      const verifyClient = await UserSchema.findOne({
        _id: data.id,
        status: true,
      });
      if (verifyClient==null) {
        throw new ResourceNotFound('Client Not Available', '');
      }
      const questions = await QuestionsSchema.findOne({
        typeform_id: data.type_form_id,
        typeform_question_id: data.type_form_question_id,
      });
      if (questions!=null) {
        const pastTest = await ClientAnswersSchema.findOne({
          type_form_id: data.type_form_id,
          users_id: data.id,
          question_id: data.type_form_question_id,
        });
        if (pastTest != null) {
          if (pastTest.answer_value && pastTest.answer_value.value) {
            return pastTest.answer_value.value;
          }
        } else {
          throw new ResourceNotFound('No Test Results', '');
        }
      } else {
        throw new ResourceNotFound('No question found', '');
      }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
