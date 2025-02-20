import ClientNotesDataSource
  from '../DataSource/Mongo/ClientNotesDataSource';
/**
 * class CreateClientNotes
 */
class CreateClientNotes {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientNotesDataSource().create(data);
  }
}
module.exports = CreateClientNotes;
