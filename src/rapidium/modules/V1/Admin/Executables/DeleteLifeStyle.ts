import LifeStyleDataSource
  from '../DataSource/Mongo/Recommendations/LifeStyleDataSource';
/**
 * class DeleteLifeStyle
 */
class DeleteLifeStyle {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new LifeStyleDataSource().delete(data);
  }
}
module.exports = DeleteLifeStyle;
