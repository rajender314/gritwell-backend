import ClientAppointmentsDataSource from '../DataSource/Mongo/ClientAppointmentsDataSource';
/**
 * class UpdateAppointment
 */
class UpdateAppointment {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientAppointmentsDataSource().update(data);
  }
}

module.exports = UpdateAppointment;
