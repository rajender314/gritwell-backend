import WebDataSource from '@basePath/Web/DataSource/Mongo/LoginDataSource';
/**
 * Executable file for ForgotPassword
 */
class ForgotPassword {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new WebDataSource().forgotPassword(data);
  }
}
module.exports = ForgotPassword;
