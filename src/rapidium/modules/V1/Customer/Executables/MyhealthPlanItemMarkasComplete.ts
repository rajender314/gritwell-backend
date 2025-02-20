import MyhealthPlanDataSource
  from '@basePath/Customer/DataSource/Mongo/MyhealthPlanDataSource';
/**
 * class MyhealthPlanItemMarkasComplete
 */
class MyhealthPlanItemMarkasComplete {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new MyhealthPlanDataSource().dailyGoalMarkasComplete(data);
  }
}

module.exports = MyhealthPlanItemMarkasComplete;
