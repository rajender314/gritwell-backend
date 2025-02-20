import LifeStyleDataSource
  from '../DataSource/Mongo/Recommendations/LifeStyleDataSource';
/**
 * class GetLifeStyles
 */
class GetLifeStyles {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new LifeStyleDataSource().get(data);
  }
}
module.exports = GetLifeStyles;
