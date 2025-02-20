import TestDataSource from '../DataSource/Mongo/Recommendations/TestDataSource';
/**
 * class GetTests
 */
class GetTests {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new TestDataSource().get(data);
  }
}
module.exports = GetTests;
