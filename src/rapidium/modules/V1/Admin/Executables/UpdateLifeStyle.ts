import LifeStyleDataSource
  from '../DataSource/Mongo/Recommendations/LifeStyleDataSource';
/**
 * class UpdateLifeStyle
 */
class UpdateLifeStyle {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new LifeStyleDataSource().update(data);
  }
}
module.exports = UpdateLifeStyle;
