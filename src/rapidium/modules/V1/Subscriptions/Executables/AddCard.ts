import SubscriptionsDataSource
  from '../DataSource/Mongo/SubscriptionsDataSource';

/**
 * class AddCard
 */
class AddCard {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SubscriptionsDataSource().addCard(data);
  }
}

module.exports = AddCard;
