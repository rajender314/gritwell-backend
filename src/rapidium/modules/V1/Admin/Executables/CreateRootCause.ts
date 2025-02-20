import RootCauseDataSource
  from '../DataSource/Mongo/Hypothesis/RootCauseDataSource';
/**
 * class CreateRootCause
 */
class CreateRootCause {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RootCauseDataSource().create(data);
  }
}
module.exports = CreateRootCause;
