import CustomerPaymentHistoryDataSource
  from
  '@basePath/Customer/DataSource/Mongo/CustomerPaymentHistoryDataSource';
/**
 * class DownloadPaymentDetails
 */
class DownloadPaymentDetails {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerPaymentHistoryDataSource().downloadPaymentDetails(
        data,
    );
  }
}

module.exports = DownloadPaymentDetails;
