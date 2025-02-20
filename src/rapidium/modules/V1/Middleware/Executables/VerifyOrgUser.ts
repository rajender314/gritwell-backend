import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for verifyOrgUser
 */
class VerifyOrgUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().verifyOrgUser(data);
  }
}
module.exports = VerifyOrgUser;
