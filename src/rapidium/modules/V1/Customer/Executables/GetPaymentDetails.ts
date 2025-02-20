import CustomerPaymentHistoryDataSource
  from
  '@basePath/Customer/DataSource/Mongo/CustomerPaymentHistoryDataSource';
/**
 * class GetPaymentDetails
 */
class GetPaymentDetails {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerPaymentHistoryDataSource().paymentDetails(data);
  }
}

module.exports = GetPaymentDetails;
