import ExportHypothesisDataSource
  from '../DataSource/Mongo/ExportHypothesisDataSource';
/**
 * class DownloadGoal
 */
class DownloadGoal {
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
    return await new ExportHypothesisDataSource().downloadGoal(data);
  }
}
module.exports = DownloadGoal;
