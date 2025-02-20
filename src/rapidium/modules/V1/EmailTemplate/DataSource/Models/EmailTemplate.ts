import BaseModel from '@rapCoreBase/Models/BaseModel';
import {EmailTemplateSchema}
  from '@rapCore/src/Base/Mailer/EmailTemplateSchema';
/**
 * EmailTemplate
 */
export default class EmailTemplate extends BaseModel {
  /**
   * constructor
   */
  constructor() {
    super(EmailTemplateSchema);
  }
}
