import WebDataSource from '@basePath/Web/DataSource/Mongo/LoginDataSource';
/**
 * Executable file for Login
 */
class Login {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new WebDataSource().login(data);
  }
}
module.exports = Login;
