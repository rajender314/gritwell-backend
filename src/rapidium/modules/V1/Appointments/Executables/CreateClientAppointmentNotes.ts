import ClientAppointmentNotesDataSource from '../DataSource/Mongo/ClientAppointmentNotesDataSource';
/**
 * class CreateClientAppointmentNotes
 */
class CreateClientAppointmentNotes {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientAppointmentNotesDataSource().create(data);
  }
}

module.exports = CreateClientAppointmentNotes;
