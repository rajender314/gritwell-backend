import CustomerStatsDataSource
  from
  '@basePath/Customer/DataSource/Mongo/CustomerStatsDataSource';
/**
 * class CustomerStats
 */
class CustomerStats {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerStatsDataSource().customerStats(data);
  }
}

module.exports = CustomerStats;
