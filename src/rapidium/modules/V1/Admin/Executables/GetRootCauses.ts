import RootCauseDataSource
  from '../DataSource/Mongo/Hypothesis/RootCauseDataSource';
/**
 * class GetRootCauses
 */
class GetRootCauses {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RootCauseDataSource().get(data);
  }
}
module.exports = GetRootCauses;
