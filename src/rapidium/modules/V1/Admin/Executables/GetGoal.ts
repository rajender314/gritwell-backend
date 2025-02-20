import GoalDataSource from '../DataSource/Mongo/Hypothesis/GoalDataSource';
/**
 * class GetGoal
 */
class GetGoal {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new GoalDataSource().view(data);
  }
}
module.exports = GetGoal;
