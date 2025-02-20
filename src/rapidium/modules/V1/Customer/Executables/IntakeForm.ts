import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * class IntakeForm
 */
class IntakeForm {
/**
   * constructor
   */
  constructor() { }
  /**
* @param {data} data
* @return {Object}
*/
  async execute(data: any) {
    return await new CustomerDataSource().intakeForm(data);
  }
}
module.exports = IntakeForm;
