import ClientGoalsDataSource
  from '../DataSource/Mongo/ClientGoalsDataSource';
/**
 * class CreateClientGoals
 */
class CreateClientGoals {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientGoalsDataSource().create(data);
  }
}
module.exports = CreateClientGoals;
