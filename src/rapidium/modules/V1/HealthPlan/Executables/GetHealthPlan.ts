import HealthPlanDataSource
  from '../DataSource/Mongo/HealthPlanDataSource';
/**
 * class GetHealthPlan
 */
class GetHealthPlan {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new HealthPlanDataSource().get(data);
  }
}
module.exports = GetHealthPlan;
