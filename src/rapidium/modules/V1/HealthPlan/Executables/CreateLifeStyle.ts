import LifeStyleDataSource
  from '../DataSource/Mongo/LifeStyleDataSource';
/**
 * class CreateLifeStyle
 */
class CreateLifeStyle {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new LifeStyleDataSource().create(data);
  }
}
module.exports = CreateLifeStyle;
