import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';

/**
 * class ClientSubscription
 */
class ClientSubscription {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SubscriptionsDataSource().clientsubscription(data);
  }
}

module.exports = ClientSubscription;
