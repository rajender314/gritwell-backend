import PhasesOfCareDataSource
  from '../DataSource/Mongo/PhasesOfCareDataSource';
/**
 * class GetPhasesOfCare
 */
class GetPhasesOfCare {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new PhasesOfCareDataSource().get(data);
  }
}
module.exports = GetPhasesOfCare;
