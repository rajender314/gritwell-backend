import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';

/**
 * class ClientResumeSubscription
 */
class ClientResumeSubscription {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SubscriptionsDataSource().clientResumeSubscription(data);
  }
}

module.exports = ClientResumeSubscription;
