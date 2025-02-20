import TestDataSource from '../DataSource/Mongo/Recommendations/TestDataSource';
/**
 * class UpdateTest
 */
class UpdateTest {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new TestDataSource().update(data);
  }
}
module.exports = UpdateTest;
