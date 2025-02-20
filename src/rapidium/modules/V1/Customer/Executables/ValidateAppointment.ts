import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * class ValidateAppointment
 */
class ValidateAppointment {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new CustomerDataSource().validateAppointment(data);
  }
}
module.exports = ValidateAppointment;
