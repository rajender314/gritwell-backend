import NutritionDataSource
  from '../DataSource/Mongo/Recommendations/NutritionDataSource';
/**
 * class GetNutritions
 */
class GetNutritions {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new NutritionDataSource().get(data);
  }
}
module.exports = GetNutritions;
