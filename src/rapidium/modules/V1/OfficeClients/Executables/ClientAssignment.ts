import ClientAssignmentDataSource
  from '../DataSource/Mongo/ClientAssignmentDataSource';
/**
 * class ClientAssignment
 */
class ClientAssignment {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new ClientAssignmentDataSource().clientAssignment(data);
  }
}

module.exports = ClientAssignment;
