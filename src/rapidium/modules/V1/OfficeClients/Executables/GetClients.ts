import ClientsDataSource from '../DataSource/Mongo/ClientsDataSource';
/**
 * class GetClients
 */
class GetClients {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientsDataSource().getClients(data);
  }
}

module.exports = GetClients;
