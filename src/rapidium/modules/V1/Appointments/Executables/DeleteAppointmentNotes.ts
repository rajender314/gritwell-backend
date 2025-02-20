import ClientAppointmentNotesDataSource from '../DataSource/Mongo/ClientAppointmentNotesDataSource';
/**
 * class DeleteAppointmentNotes
 */
class DeleteAppointmentNotes {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientAppointmentNotesDataSource().delete(data);
  }
}

module.exports = DeleteAppointmentNotes;
