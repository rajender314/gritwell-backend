import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * class ReSendEmailVerification
 */
class ReSendEmailVerification {
  /**
     * constructor
     */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new CustomerDataSource().reSendEmailVerification(data);
  }
}

module.exports = ReSendEmailVerification;
