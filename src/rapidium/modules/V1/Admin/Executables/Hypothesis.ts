import HypothesisDataSource from '../DataSource/Mongo/Hypothesis/HypothesisDataSource';
/**
 * class Hypothesis
 */
class Hypothesis {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new HypothesisDataSource().get(data);
  }
}
module.exports = Hypothesis;
