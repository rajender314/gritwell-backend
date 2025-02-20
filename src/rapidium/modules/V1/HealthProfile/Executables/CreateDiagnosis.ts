import ClientDiagnosisDataSource
  from '../DataSource/Mongo/ClientDiagnosisDataSource';
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
    return await new ClientDiagnosisDataSource().create(data);
  }
}
module.exports = CreateDiagnosis;
