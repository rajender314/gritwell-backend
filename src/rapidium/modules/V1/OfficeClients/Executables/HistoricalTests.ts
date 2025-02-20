import HistoricalTestsDataSource
  from '../DataSource/Mongo/HistoricalTestsDataSource';
/**
 * class HistoricalTests
 */
class HistoricalTests {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new HistoricalTestsDataSource().getTest(data);
  }
}

module.exports = HistoricalTests;
