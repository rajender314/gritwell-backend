import RootCauseDataSource
  from '../DataSource/Mongo/Hypothesis/RootCauseDataSource';
/**
 * class UpdateRootCause
 */
class UpdateRootCause {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RootCauseDataSource().update(data);
  }
}
module.exports = UpdateRootCause;
