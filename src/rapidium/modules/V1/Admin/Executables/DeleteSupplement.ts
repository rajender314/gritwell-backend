import SupplementDataSource
  from '../DataSource/Mongo/Recommendations/SupplementDataSource';
/**
 * class DeleteSupplement
 */
class DeleteSupplement {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SupplementDataSource().delete(data);
  }
}
module.exports = DeleteSupplement;
