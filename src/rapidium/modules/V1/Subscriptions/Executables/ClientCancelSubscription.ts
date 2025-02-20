import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';
/**
 * class ClientCancelSubscription
 */
class ClientCancelSubscription {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SubscriptionsDataSource().clientCancelSubscription(data);
  }
}
module.exports = ClientCancelSubscription;
