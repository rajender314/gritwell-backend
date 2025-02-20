import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for loginOauth
 */
class LoginOauth {
  /**
   * constructor
   */
  constructor() {}

  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().loginOauth(data);
  }
}
module.exports = LoginOauth;
