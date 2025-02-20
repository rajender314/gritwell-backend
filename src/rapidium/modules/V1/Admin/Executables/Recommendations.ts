import RecommendationsDataSource
  from '../DataSource/Mongo/Recommendations/RecommendationsDataSource';
/**
 * class Recommendations
 */
class Recommendations {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RecommendationsDataSource().get(data);
  }
}
module.exports = Recommendations;
