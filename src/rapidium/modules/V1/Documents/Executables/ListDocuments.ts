import ClientDocumentListDataSource
  from '../DataSource/Mongo/ClientDocumentListDataSource';
/**
 * class ListDocuments
 */
class ListDocuments {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientDocumentListDataSource().get(data);
  }
}
module.exports = ListDocuments;
