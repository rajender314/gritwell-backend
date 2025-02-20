import SupplementDataSource
  from '../DataSource/Mongo/Recommendations/SupplementDataSource';
/**
 * class GetSupplement
 */
class GetSupplement {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SupplementDataSource().view(data);
  }
}
module.exports = GetSupplement;
