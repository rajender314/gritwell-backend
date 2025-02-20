import DiagnosisDataSource
  from '../DataSource/Mongo/Hypothesis/DiagnosisDataSource';
/**
 * class UpdateDiagnosis
 */
class UpdateDiagnosis {
  /**
     * constructor
     */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new DiagnosisDataSource().update(data);
  }
}
module.exports = UpdateDiagnosis;
