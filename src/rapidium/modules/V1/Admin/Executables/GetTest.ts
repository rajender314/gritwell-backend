import TestDataSource from '../DataSource/Mongo/Recommendations/TestDataSource';
/**
 * class GetTest
 */
class GetTest {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new TestDataSource().view(data);
  }
}
module.exports = GetTest;
