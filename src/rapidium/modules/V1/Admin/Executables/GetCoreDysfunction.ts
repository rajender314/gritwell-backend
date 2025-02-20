import CoreDysfunctionDataSource
  from '../DataSource/Mongo/Hypothesis/CoreDysfunctionDataSource';
/**
 * class GetCoreDysfunction
 */
class GetCoreDysfunction {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new CoreDysfunctionDataSource().view(data);
  }
}
module.exports = GetCoreDysfunction;
