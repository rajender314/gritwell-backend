import CustomerPaymentHistoryDataSource
  from
  '@basePath/Customer/DataSource/Mongo/CustomerPaymentHistoryDataSource';
/**
 * class DownloadPaymentHistory
 */
class DownloadPaymentHistory {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    // eslint-disable-next-line
    return await new CustomerPaymentHistoryDataSource().downloadPaymentHistory(data);
  }
}

module.exports = DownloadPaymentHistory;
