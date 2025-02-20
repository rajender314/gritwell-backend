import NutritionDataSource
  from '../DataSource/Mongo/Recommendations/NutritionDataSource';
/**
 * class CreateNutrition
 */
class CreateNutrition {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new NutritionDataSource().create(data);
  }
}
module.exports = CreateNutrition;
