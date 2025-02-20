import ClientPaymentsDataSource
  from '../DataSource/Mongo/ClientPaymentsDataSource';
/**
 * class ClientPayments
 */
class ClientPayments {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientPaymentsDataSource().get(data);
  }
}
module.exports = ClientPayments;
