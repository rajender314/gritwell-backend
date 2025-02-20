import SupplementDataSource
  from '../DataSource/Mongo/Recommendations/SupplementDataSource';
/**
 * class GetSupplements
 */
class GetSupplements {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SupplementDataSource().get(data);
  }
}
module.exports = GetSupplements;
