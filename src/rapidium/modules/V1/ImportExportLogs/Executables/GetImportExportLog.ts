import ImportExportLogDataSource
  from '../DataSource/Mongo/ImportExportLogDataSource';
/**
 * class GetImportExportLog
 */
class GetImportExportLog {
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
    return await new ImportExportLogDataSource().getActivity(data);
  }
}
module.exports = GetImportExportLog;
