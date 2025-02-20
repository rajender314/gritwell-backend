import ClientNotesDataSource from '../DataSource/Mongo/ClientNotesDataSource';
/**
 * class ClientNotes
 */
class ClientNotes {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientNotesDataSource().getNotes(data);
  }
}

module.exports = ClientNotes;
