import CoreDysfunctionDataSource
  from '../DataSource/Mongo/Hypothesis/CoreDysfunctionDataSource';
/**
 * class UpdateCoreDysfunction
 */
class UpdateCoreDysfunction {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new CoreDysfunctionDataSource().update(data);
  }
}
module.exports = UpdateCoreDysfunction;
