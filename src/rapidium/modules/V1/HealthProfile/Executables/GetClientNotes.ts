import ClientNotesDataSource
  from '../DataSource/Mongo/ClientNotesDataSource';
/**
 * class GetClientNotes
 */
class GetClientNotes {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientNotesDataSource().get(data);
  }
}
module.exports = GetClientNotes;
