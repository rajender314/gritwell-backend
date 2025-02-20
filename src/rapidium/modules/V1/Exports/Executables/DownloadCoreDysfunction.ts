import ExportHypothesisDataSource
  from '../DataSource/Mongo/ExportHypothesisDataSource';
/**
 * class DownloadCoreDysfunction
 */
class DownloadCoreDysfunction {
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
    return await new ExportHypothesisDataSource().downloadCoreDysfunction(data);
  }
}
module.exports = DownloadCoreDysfunction;
