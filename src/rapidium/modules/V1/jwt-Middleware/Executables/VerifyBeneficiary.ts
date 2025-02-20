import MiddlewareDataSource from '../DataSource/Mongo/MiddlewareDataSource';
/**
 * Executable file for VerifyBeneficiary
 */
class VerifyBeneficiary {
  /**
   * constructor
   */
  constructor() {}
  /**
 *
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new MiddlewareDataSource().verifyBeneficiary(data);
  }
}
module.exports = VerifyBeneficiary;
