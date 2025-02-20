import PWALandingPagesDataSource
  from '@basePath/PWA/DataSource/Mongo/PWALandingPagesDataSource';
/**
 * Executable file for SubscriptionPlans
 */
class SubscriptionPlans {
/**
   * constructor
   */
  constructor() {}
  /**
* @param {data} data
* @return {Object} data, success and message
*/
  async execute(data: any) {
    return await new PWALandingPagesDataSource().subscriptionPlans(data);
  }
}

module.exports = SubscriptionPlans;
