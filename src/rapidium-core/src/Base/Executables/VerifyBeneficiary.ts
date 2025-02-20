import CustomerDataSource from
  '../../../../rapidium/modules/V1/Customer/DataSource/Pg/CustomerDataSource';
/**
 * class VerifyBeneficiary
 */
class VerifyBeneficiary {
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerDataSource().verifyRequest(data);
  }
}
module.exports = VerifyBeneficiary;
