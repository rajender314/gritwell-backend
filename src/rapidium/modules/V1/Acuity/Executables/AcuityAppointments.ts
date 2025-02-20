import AcuityOperations
  from
  '@basePath/Acuity/DataSource/Models/AcuityOperations';
/**
 * class AcuityAppointments
 */
class AcuityAppointments {
  /**
   * constructor
   */
  constructor() {}
  /**
* @param {data} data
* @return {Object} data, success and message
*/
  async execute(data: any) {
    return await new AcuityOperations().acuityAppointments(data);
  }
}
module.exports = AcuityAppointments;
