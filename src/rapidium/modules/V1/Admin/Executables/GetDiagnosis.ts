import DiagnosisDataSource
  from '../DataSource/Mongo/Hypothesis/DiagnosisDataSource';
/**
 * class GetDiagnosis
 */
class GetDiagnosis {
  /**
     * constructor
     */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new DiagnosisDataSource().view(data);
  }
}
module.exports = GetDiagnosis;
