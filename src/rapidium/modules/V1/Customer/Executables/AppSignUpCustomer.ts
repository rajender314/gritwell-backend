import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * Executables class for AppSignUpCustomer
 */
class AppSignUpCustomer {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new CustomerDataSource().appSignUpCustomer(data);
  }
}
module.exports = AppSignUpCustomer;
