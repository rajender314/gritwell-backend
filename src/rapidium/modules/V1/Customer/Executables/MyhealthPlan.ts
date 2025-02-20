import MyhealthPlanDataSource
  from '@basePath/Customer/DataSource/Mongo/MyhealthPlanDataSource';
/**
 * class MyhealthPlan
 */
class MyhealthPlan {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new MyhealthPlanDataSource().myhealthPlan(data);
  }
}

module.exports = MyhealthPlan;
