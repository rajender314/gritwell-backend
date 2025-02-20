import CustomerPaymentHistoryDataSource
  from
  '@basePath/Customer/DataSource/Mongo/CustomerPaymentHistoryDataSource';
/**
 * class PaymentHistory
 */
class PaymentHistory {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerPaymentHistoryDataSource().paymentHistory(data);
  }
}

module.exports = PaymentHistory;
