import LifeStyleDataSource
  from '../DataSource/Mongo/LifeStyleDataSource';
/**
 * class GetLifeStyle
 */
class GetLifeStyle {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new LifeStyleDataSource().get(data);
  }
}
module.exports = GetLifeStyle;
