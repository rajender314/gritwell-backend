import ClientsDataSource from '../DataSource/Mongo/ClientsDataSource';
/**
 * class ClientAssignment
 */
class GetClientDetails {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientsDataSource().getClientDetails(data);
  }
}

module.exports = GetClientDetails;
