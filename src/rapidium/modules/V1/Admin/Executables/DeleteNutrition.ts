import NutritionDataSource
  from '../DataSource/Mongo/Recommendations/NutritionDataSource';
/**
 * class DeleteNutrition
 */
class DeleteNutrition {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new NutritionDataSource().delete(data);
  }
}
module.exports = DeleteNutrition;
