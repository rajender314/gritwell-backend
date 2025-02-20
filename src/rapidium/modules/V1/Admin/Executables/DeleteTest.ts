import TestDataSource from '../DataSource/Mongo/Recommendations/TestDataSource';
/**
 * class DeleteTest
 */
class DeleteTest {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new TestDataSource().delete(data);
  }
}
module.exports = DeleteTest;
