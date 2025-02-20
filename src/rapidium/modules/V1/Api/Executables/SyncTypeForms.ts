import ApiDataSource from '@basePath/Api/DataSource/Mongo/ApiDataSource';
/**
 * class SyncTypeForms
 */
class SyncTypeForms {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ApiDataSource().synTypeForms(data);
    // if (data.sync_type == 'forms') {
    //   return await new ApiDataSource().synTypeForms(data);
    // } else if (data.sync_type == 'forms_questions') {
    //   return await new ApiDataSource().synTypeFormsQuestions(data);
    // } else if (data.sync_type == 'forms_answers') {
    //   return await new ApiDataSource().synTypeForms(data);
    // }
  }
}
module.exports = SyncTypeForms;
