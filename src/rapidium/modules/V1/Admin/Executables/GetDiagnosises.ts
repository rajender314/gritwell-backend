import DiagnosisDataSource
  from '../DataSource/Mongo/Hypothesis/DiagnosisDataSource';
/**
 * class GetDiagnosises
 */
class GetDiagnosises {
  /**
     * constructor
     */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new DiagnosisDataSource().get(data);
  }
}
module.exports = GetDiagnosises;
