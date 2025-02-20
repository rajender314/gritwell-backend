import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for verifyAuthorizationToken
 */
class VerifyAuthorizationToken {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().verifyAuthorizationToken(data);
  }
}
module.exports = VerifyAuthorizationToken;
