import ClientAppointmentNotesDataSource from '../DataSource/Mongo/ClientAppointmentNotesDataSource';
/**
 * class GetClientAppointmentNotes
 */
class GetClientAppointmentNotes {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientAppointmentNotesDataSource().get(data);
  }
}

module.exports = GetClientAppointmentNotes;
