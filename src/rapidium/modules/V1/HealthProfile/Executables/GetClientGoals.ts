import ClientGoalsDataSource
  from '../DataSource/Mongo/ClientGoalsDataSource';
/**
 * class GetClientGoals
 */
class GetClientGoals {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientGoalsDataSource().get(data);
  }
}
module.exports = GetClientGoals;
