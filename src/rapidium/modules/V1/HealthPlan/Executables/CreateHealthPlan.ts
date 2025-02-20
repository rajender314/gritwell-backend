import HealthPlanDataSource
  from '../DataSource/Mongo/HealthPlanDataSource';
/**
 * class CreateHealthPlan
 */
class CreateHealthPlan {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    const createHealthplan = await new HealthPlanDataSource().create(data);
    await new HealthPlanDataSource().updateTimeStamp(data);
    return createHealthplan;
  }
}
module.exports = CreateHealthPlan;
