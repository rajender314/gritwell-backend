import ClientDocumentDataSource
  from '../DataSource/Mongo/ClientDocumentDataSource';
/**
 * class ClientDocument
 */
class ClientDocument {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientDocumentDataSource().get(data);
  }
}
module.exports = ClientDocument;
