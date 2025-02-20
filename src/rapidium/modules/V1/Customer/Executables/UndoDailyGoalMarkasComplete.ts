import MyhealthPlanDataSource
  from '@basePath/Customer/DataSource/Mongo/MyhealthPlanDataSource';
/**
 * class UndoDailyGoalMarkasComplete
 */
class UndoDailyGoalMarkasComplete {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new MyhealthPlanDataSource().undoDailyGoalMarkasComplete(data);
  }
}

module.exports = UndoDailyGoalMarkasComplete;
