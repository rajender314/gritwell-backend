import ExportHypothesisDataSource
  from '../DataSource/Mongo/ExportHypothesisDataSource';
/**
 * class DownloadDiagnosis
 */
class DownloadDiagnosis {
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
    return await new ExportHypothesisDataSource().downloadDiagnosis(data);
  }
}
module.exports = DownloadDiagnosis;
