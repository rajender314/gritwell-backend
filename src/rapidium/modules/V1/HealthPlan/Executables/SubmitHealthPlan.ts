import ActiveHealthPlanDataSource
  from '../DataSource/Mongo/ActiveHealthPlanDataSource';
/**
 * class SubmitHealthPlan
 */
class SubmitHealthPlan {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ActiveHealthPlanDataSource().submit(data);
  }
}
module.exports = SubmitHealthPlan;
