import WebDataSource from '@basePath/Web/DataSource/Mongo/LoginDataSource';
/**
 * Executable file for ForgotToken
 */
class ForgotToken {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new WebDataSource().verifyForgotToken(data);
  }
}
module.exports = ForgotToken;
