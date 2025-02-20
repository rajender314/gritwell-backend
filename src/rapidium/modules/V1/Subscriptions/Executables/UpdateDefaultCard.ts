import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';

/**
 * class UpdateDefaultCard
 */
class UpdateDefaultCard {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SubscriptionsDataSource().updateDefaultCard(data);
  }
}

module.exports = UpdateDefaultCard;
