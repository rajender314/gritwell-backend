import AppointmentStatusDataSource from '../DataSource/Mongo/AppointmentStatusDataSource';
/**
 * class UpdateAppointmentStatus
 */
class UpdateAppointmentStatus {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new AppointmentStatusDataSource().update(data);
  }
}

module.exports = UpdateAppointmentStatus;
