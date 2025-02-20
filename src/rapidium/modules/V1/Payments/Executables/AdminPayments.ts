import AdminPaymentsDataSource
  from '../DataSource/Mongo/AdminPaymentsDataSource';
/**
 * class AdminPayments
 */
class AdminPayments {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new AdminPaymentsDataSource().get(data);
  }
}
module.exports = AdminPayments;
