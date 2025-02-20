import ClientCoreDysfunctionDataSource
  from '../DataSource/Mongo/ClientCoreDysfunctionDataSource';
/**
 * class CreateCoreDysfunction
 */
class CreateCoreDysfunction {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientCoreDysfunctionDataSource().create(data);
  }
}
module.exports = CreateCoreDysfunction;
