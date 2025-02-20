import ActiveHealthPlanDataSource
  from '../DataSource/Mongo/ActiveHealthPlanDataSource';
/**
 * class EditHealthPlan
 */
class EditHealthPlan {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ActiveHealthPlanDataSource().edit(data);
  }
}
module.exports = EditHealthPlan;
