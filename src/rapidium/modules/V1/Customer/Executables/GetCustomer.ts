import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * Executables class for GetCustomer
 */
class GetCustomer {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new CustomerDataSource().getCustomer(data);
  }
}
module.exports = GetCustomer;
