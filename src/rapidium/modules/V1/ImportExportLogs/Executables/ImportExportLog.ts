import ImportExportLogDataSource
  from '../DataSource/Mongo/ImportExportLogDataSource';
/**
 * class ImportExportLog
 */
class ImportExportLog {
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
    return await new ImportExportLogDataSource().create(data);
  }
}
module.exports = ImportExportLog;
