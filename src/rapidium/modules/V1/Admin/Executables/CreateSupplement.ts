import SupplementDataSource
  from '../DataSource/Mongo/Recommendations/SupplementDataSource';
/**
 * class CreateSupplement
 */
class CreateSupplement {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SupplementDataSource().create(data);
  }
}
module.exports = CreateSupplement;
