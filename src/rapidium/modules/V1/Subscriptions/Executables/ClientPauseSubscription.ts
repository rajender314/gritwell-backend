import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';

/**
 * class ClientPauseSubscription
 */
class ClientPauseSubscription {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SubscriptionsDataSource().clientPauseSubscription(data);
  }
}

module.exports = ClientPauseSubscription;
