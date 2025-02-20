import ClientAppointmentsDataSource from '../DataSource/Mongo/ClientAppointmentsDataSource';
/**
 * class ClientAppointments
 */
class ClientAppointments {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientAppointmentsDataSource().get(data);
  }
}

module.exports = ClientAppointments;
