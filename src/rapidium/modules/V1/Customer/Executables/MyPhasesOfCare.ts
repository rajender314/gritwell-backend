import CustomerDataSource
  from
  '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
/**
 * class MyPhasesOfCare
 */
class MyPhasesOfCare {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerDataSource().myPhasesOfCare(data);
  }
}

module.exports = MyPhasesOfCare;
