import RootCauseDataSource
  from '../DataSource/Mongo/Hypothesis/RootCauseDataSource';
/**
 * class GetRootCause
 */
class GetRootCause {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RootCauseDataSource().view(data);
  }
}
module.exports = GetRootCause;
