import ClientsDataSource from '../DataSource/Mongo/ClientsDataSource';
/**
 * class UpdateClient
 */
class UpdateClient {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientsDataSource().updateClient(data);
  }
}

module.exports = UpdateClient;
