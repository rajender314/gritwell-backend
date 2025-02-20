import ExportRecommendationDataSource
  from '../DataSource/Mongo/ExportRecommendationDataSource';
/**
 * class DownloadNutrition
 */
class DownloadNutrition {
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
    return await new ExportRecommendationDataSource().downloadNutrition(data);
  }
}
module.exports = DownloadNutrition;
