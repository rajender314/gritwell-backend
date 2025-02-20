import DeleteHealthPlanDetailsDataSource
  from '../DataSource/Mongo/DeleteHealthPlanDetailsDataSource';
/**
 * class DeleteHealthPlanDetails
 */
class DeleteHealthPlanDetails {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new DeleteHealthPlanDetailsDataSource().delete(data);
  }
}
module.exports = DeleteHealthPlanDetails;
