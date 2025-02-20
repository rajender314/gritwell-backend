import LifeStyleDataSource
  from '../DataSource/Mongo/Recommendations/LifeStyleDataSource';
/**
 * class GetLifeStyle
 */
class GetLifeStyle {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new LifeStyleDataSource().view(data);
  }
}
module.exports = GetLifeStyle;
