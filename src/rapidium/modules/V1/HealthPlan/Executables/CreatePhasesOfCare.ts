import PhasesOfCareDataSource
  from '../DataSource/Mongo/PhasesOfCareDataSource';
/**
 * class CreatePhasesOfCare
 */
class CreatePhasesOfCare {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new PhasesOfCareDataSource().create(data);
  }
}
module.exports = CreatePhasesOfCare;
