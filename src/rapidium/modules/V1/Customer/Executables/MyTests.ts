import MyhealthPlanDataSource
  from '@basePath/Customer/DataSource/Mongo/MyhealthPlanDataSource';
/**
 * class MyTests
 */
class MyTests {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new MyhealthPlanDataSource().getMyTests(data);
  }
}

module.exports = MyTests;
