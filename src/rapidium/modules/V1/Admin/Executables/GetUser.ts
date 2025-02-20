import AdminDataSource from '../DataSource/Mongo/AdminDataSource';
/**
 * class GetUser
 */
class GetUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new AdminDataSource().getUser(data);
  }
}
module.exports = GetUser;
