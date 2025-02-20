import WebDataSource from '@basePath/Web/DataSource/Mongo/LoginDataSource';
/**
 * Executable file for ForgotTokens
 */
class ForgotTokens {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new WebDataSource().resetPassword(data);
  }
}
module.exports = ForgotTokens;
