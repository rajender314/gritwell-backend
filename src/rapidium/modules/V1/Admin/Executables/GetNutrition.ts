import NutritionDataSource
  from '../DataSource/Mongo/Recommendations/NutritionDataSource';
/**
 * class GetNutrition
 */
class GetNutrition {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new NutritionDataSource().view(data);
  }
}
module.exports = GetNutrition;
