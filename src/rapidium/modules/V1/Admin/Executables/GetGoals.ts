import GoalDataSource from '../DataSource/Mongo/Hypothesis/GoalDataSource';
/**
 * class GetGoals
 */
class GetGoals {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new GoalDataSource().get(data);
  }
}
module.exports = GetGoals;
