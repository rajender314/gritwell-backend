import WebFlowDataSource
  from '../DataSource/Mongo/WebFlowDataSource';

/**
   *  class WebFlowStripeWebhook
   */
class WebFlowStripeWebhook {
  /**
   * constructor
   */
  constructor() { }
  /**
    * @param {data} data
    * @return {Object}
    */
  async execute(data: any) {
    return await new WebFlowDataSource().webFlowStripeWebhook(data);
  }
}

module.exports = WebFlowStripeWebhook;
