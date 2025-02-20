import CurrentAppointmentDataSource from '../DataSource/Mongo/CurrentAppointmentDataSource';
/**
 * class CurrentAppointment
 */
class CurrentAppointment {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CurrentAppointmentDataSource().get(data);
  }
}

module.exports = CurrentAppointment;
