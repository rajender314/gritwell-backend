
import {EmailTemplateSchema}
  from '@rapCore/src/Base/Mailer/EmailTemplateSchema';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
/**
 * class EmailTemplate
 */
export default class EmailTemplate {
  /**
     *
     * @param {dbName} dbName
     * @return {Object}
     */
  async getEmailTemplateFromDBName(dbName:string) {
    try {
      return await EmailTemplateSchema.findOne({db_name: dbName, status: true});
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async emailTemplateFind(matchObj: Object) {
    try {
      return await EmailTemplateSchema.findOne(matchObj);
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}


