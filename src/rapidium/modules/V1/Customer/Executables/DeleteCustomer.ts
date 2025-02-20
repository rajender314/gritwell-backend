import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * Executables class for DeleteCustomer
 */
class DeleteCustomer {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new CustomerDataSource().remove(data);
  }
}
module.exports = DeleteCustomer;
