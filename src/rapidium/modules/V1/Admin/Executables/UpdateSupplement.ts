import SupplementDataSource
  from '../DataSource/Mongo/Recommendations/SupplementDataSource';
/**
 * class UpdateSupplement
 */
class UpdateSupplement {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SupplementDataSource().update(data);
  }
}
module.exports = UpdateSupplement;
