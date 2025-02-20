import ExportRecommendationDataSource
  from '../DataSource/Mongo/ExportRecommendationDataSource';
/**
 * class DownloadSupplement
 */
class DownloadSupplement {
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
    return await new ExportRecommendationDataSource().downloadSupplement(data);
  }
}
module.exports = DownloadSupplement;
