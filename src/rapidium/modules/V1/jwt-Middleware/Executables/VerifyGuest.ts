import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for VerifyGuest
 */
class VerifyGuest {
  /**
   * constructor
   */
  constructor() {}
  /**
  * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().verifyGuest(data);
  }
}
module.exports = VerifyGuest;
