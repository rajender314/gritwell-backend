import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';

/**
   *  class StripeWebhook
   */
class StripeWebhook {
  /**
   * constructor
   */
  constructor() { }
  /**
    * @param {data} data
    * @return {Object}
    */
  async execute(data: any) {
    return await new SubscriptionsDataSource().stripeWebhook(data);
  }
}

module.exports = StripeWebhook;
