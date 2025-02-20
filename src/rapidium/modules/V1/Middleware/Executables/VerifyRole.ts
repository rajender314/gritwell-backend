import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for verifyRole
 */
class VerifyRole {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().verifyRole(data);
  }
}
module.exports = VerifyRole;
