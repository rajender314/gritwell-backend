import ActiveHealthPlanDataSource
  from '../DataSource/Mongo/ActiveHealthPlanDataSource';
/**
 * class GetHealthPlanDetails
 */
class GetHealthPlanDetails {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ActiveHealthPlanDataSource().get(data);
  }
}
module.exports = GetHealthPlanDetails;
