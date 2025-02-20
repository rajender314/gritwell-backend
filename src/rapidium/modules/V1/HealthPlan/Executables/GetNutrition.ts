import NutritionDataSource
  from '../DataSource/Mongo/NutritionDataSource';
/**
 * class GetNutrition
 */
class GetNutrition {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new NutritionDataSource().get(data);
  }
}
module.exports = GetNutrition;
