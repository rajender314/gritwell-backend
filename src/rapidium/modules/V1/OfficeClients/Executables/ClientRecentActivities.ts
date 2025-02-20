import ClientRecentActivityDataSource from '../DataSource/Mongo/ClientRecentActivityDataSource';
/**
 * class ClientRecentActivities
 */
class ClientRecentActivities {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientRecentActivityDataSource().getActivities(data);
  }
}

module.exports = ClientRecentActivities;
