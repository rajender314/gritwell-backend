import NutritionDataSource
  from '../DataSource/Mongo/Recommendations/NutritionDataSource';
/**
 * class UpdateNutrition
 */
class UpdateNutrition {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new NutritionDataSource().update(data);
  }
}
module.exports = UpdateNutrition;
