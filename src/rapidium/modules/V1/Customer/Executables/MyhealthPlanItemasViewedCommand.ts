import MyhealthPlanDataSource
  from '@basePath/Customer/DataSource/Mongo/MyhealthPlanDataSource';
/**
 * class MyhealthPlanItemasViewedCommand
 */
class MyhealthPlanItemasViewedCommand {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new MyhealthPlanDataSource().healthPlanItemasViewed(data);
  }
}

module.exports = MyhealthPlanItemasViewedCommand;
