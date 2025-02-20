import CoreDysfunctionDataSource
  from '../DataSource/Mongo/Hypothesis/CoreDysfunctionDataSource';
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
    return await new CoreDysfunctionDataSource().create(data);
  }
}
module.exports = CreateCoreDysfunction;
