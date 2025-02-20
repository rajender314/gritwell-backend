import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for VerifyMe
 */
class VerifyMe {
  /**
   * constructor
   */
  constructor() {}
  /**
  * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().verifyToken(data);
  }
}
module.exports = VerifyMe;
