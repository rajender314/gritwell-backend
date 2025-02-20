import ImportHypothesisDataSource
  from '../DataSource/Mongo/ImportHypothesisDataSource';
/**
 * class ImportHypothesis
 */
class ImportHypothesis {
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
    return await new ImportHypothesisDataSource().import(data);
  }
}
module.exports = ImportHypothesis;
