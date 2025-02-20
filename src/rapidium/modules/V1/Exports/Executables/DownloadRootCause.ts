import ExportHypothesisDataSource
  from '../DataSource/Mongo/ExportHypothesisDataSource';
/**
 * class DownloadRootCause
 */
class DownloadRootCause {
  /**
   * constructor
   */
  constructor() { }
  /**
   * execute
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ExportHypothesisDataSource().downloadRootCause(data);
  }
}
module.exports = DownloadRootCause;
