import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * Executables class for EditCustomer
 */
class EditCustomer {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new CustomerDataSource().updateCustomer(data);
  }
}
module.exports = EditCustomer;
