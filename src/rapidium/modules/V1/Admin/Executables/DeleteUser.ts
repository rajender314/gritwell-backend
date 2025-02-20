import AdminDataSource from '../DataSource/Mongo/AdminDataSource';
/**
 * class DeleteUser
 */
class DeleteUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new AdminDataSource().deleteUser(data);
  }
}
module.exports = DeleteUser;
