import ImportRecommendationDataSource
  from '../DataSource/Mongo/ImportRecommendationDataSource';
/**
 * class ImportRecommendation
 */
class ImportRecommendation {
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
    return await new ImportRecommendationDataSource().import(data);
  }
}
module.exports = ImportRecommendation;
