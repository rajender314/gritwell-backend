import RecommendationsDataSource
  from '../DataSource/Mongo/Recommendations/RecommendationsDataSource';
/**
 * class CreateRecommendation
 */
class CreateRecommendation {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new RecommendationsDataSource().create(data);
  }
}
module.exports = CreateRecommendation;
