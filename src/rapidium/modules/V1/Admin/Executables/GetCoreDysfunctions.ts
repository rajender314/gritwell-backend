import CoreDysfunctionDataSource
  from '../DataSource/Mongo/Hypothesis/CoreDysfunctionDataSource';
/**
 * class GetCoreDysfunctions
 */
class GetCoreDysfunctions {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new CoreDysfunctionDataSource().get(data);
  }
}
module.exports = GetCoreDysfunctions;
