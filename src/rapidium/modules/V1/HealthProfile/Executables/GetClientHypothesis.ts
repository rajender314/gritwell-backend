import ClientHypothesisDataSource
  from '../DataSource/Mongo/ClientHypothesisDataSource';
/**
 * class GetClientHypothesis
 */
class GetClientHypothesis {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientHypothesisDataSource().get(data);
  }
}
module.exports = GetClientHypothesis;
