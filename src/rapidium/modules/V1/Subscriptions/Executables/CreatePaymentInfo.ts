import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';
/**
 * class CreatePaymentInfo
 */
class CreatePaymentInfo {
  /**
   * constructor
   */
  constructor() { }
  /**
    * @param {data} data
    * @return {Object}
    */
  async execute(data: any) {
    return await new SubscriptionsDataSource().createPaymentInfo(data);
  }
}

module.exports = CreatePaymentInfo;
