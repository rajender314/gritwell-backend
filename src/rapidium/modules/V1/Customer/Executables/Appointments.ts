import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * class Appointments
 */
class Appointments {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new CustomerDataSource().appointments(data);
  }
}
module.exports=Appointments;
