import ActiveHealthPlanDataSource
  from '../DataSource/Mongo/ActiveHealthPlanDataSource';
/**
 * class CreateActivePlan
 */
class CreateActivePlan {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ActiveHealthPlanDataSource().create(data);
  }
}
module.exports = CreateActivePlan;
