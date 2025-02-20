import UserProfileDataSource
  from '@basePath/Web/DataSource/Mongo/UserProfileDataSource';
/**
 * Executable file for TextlineIntegration
 */
class TextlineIntegration {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new UserProfileDataSource().textLineIntegration(data);
  }
}
module.exports = TextlineIntegration;
