import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * class AppointmentPayment
 */
class AppointmentPayment {
  /**
     * constructor
     */
  constructor() { }
  /**
    * @param {data} data
    * @return {Object}
    */
  async execute(data: any) {
    return await new CustomerDataSource().appointmentPayment(data);
  }
}
module.exports = AppointmentPayment;
