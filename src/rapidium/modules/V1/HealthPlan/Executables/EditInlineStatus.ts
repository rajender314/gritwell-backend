import ActiveHealthPlanDataSource
  from '../DataSource/Mongo/ActiveHealthPlanDataSource';
/**
 * class EditInlineStatus
 */
class EditInlineStatus {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ActiveHealthPlanDataSource().editStatus(data);
  }
}
module.exports = EditInlineStatus;
