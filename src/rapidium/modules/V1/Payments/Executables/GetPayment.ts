import ClientPaymentsDataSource
  from '../DataSource/Mongo/ClientPaymentsDataSource';
/**
 * class GetPayment
 */
class GetPayment {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ClientPaymentsDataSource().view(data);
  }
}
module.exports = GetPayment;
