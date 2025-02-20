import GoalDataSource from '../DataSource/Mongo/Hypothesis/GoalDataSource';
/**
 * class CreateGoal
 */
class CreateGoal {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new GoalDataSource().create(data);
  }
}
module.exports = CreateGoal;
