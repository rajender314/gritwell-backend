import ExportRecommendationDataSource
  from '../DataSource/Mongo/ExportRecommendationDataSource';
/**
 * class DownloadTest
 */
class DownloadTest {
  /**
   * constructor
   */
  constructor() { }
  /**
   * execute
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ExportRecommendationDataSource().downloadTest(data);
  }
}
module.exports = DownloadTest;
