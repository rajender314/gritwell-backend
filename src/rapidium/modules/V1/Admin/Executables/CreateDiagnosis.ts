import DiagnosisDataSource
  from '../DataSource/Mongo/Hypothesis/DiagnosisDataSource';
/**
 * class CreateDiagnosis
 */
class CreateDiagnosis {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new DiagnosisDataSource().create(data);
  }
}
module.exports = CreateDiagnosis;
