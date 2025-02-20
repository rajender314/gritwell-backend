import ExportRecommendationDataSource
  from '../DataSource/Mongo/ExportRecommendationDataSource';
/**
 * class DownloadLifeStyle
 */
class DownloadLifeStyle {
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
    return await new ExportRecommendationDataSource().downloadLifeStyle(data);
  }
}
module.exports = DownloadLifeStyle;
