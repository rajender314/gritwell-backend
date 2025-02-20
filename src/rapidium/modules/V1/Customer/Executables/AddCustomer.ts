import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * Executables class for AddCustomer
 */
class AddCustomer {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new CustomerDataSource().createCustomer(data);
  }
}
module.exports = AddCustomer;
