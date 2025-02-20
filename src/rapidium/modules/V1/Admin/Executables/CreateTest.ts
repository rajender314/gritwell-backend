import TestDataSource from '../DataSource/Mongo/Recommendations/TestDataSource';
/**
 * class CreateTest
 */
class CreateTest {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new TestDataSource().create(data);
  }
}
module.exports = CreateTest;
