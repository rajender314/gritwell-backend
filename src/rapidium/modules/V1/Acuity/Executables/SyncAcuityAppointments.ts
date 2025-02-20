import AcuityDataSource
  from
  '@basePath/Acuity/DataSource/Mongo/AcuityDataSource';

/**
   * class SyncAcuityAppointments
   */
class SyncAcuityAppointments {
/**
   * constructor
   */
  constructor() {}
  /**
* @param {data} data
* @return {Object} data, success and message
*/
  async execute(data: any) {
    return await new AcuityDataSource().syncAcuityAppointments(data);
  }
}
module.exports = SyncAcuityAppointments;
