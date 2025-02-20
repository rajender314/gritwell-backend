import GoalDataSource from '../DataSource/Mongo/Hypothesis/GoalDataSource';
/**
 * class UpdateGoal
 */
class UpdateGoal {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new GoalDataSource().update(data);
  }
}
module.exports = UpdateGoal;
