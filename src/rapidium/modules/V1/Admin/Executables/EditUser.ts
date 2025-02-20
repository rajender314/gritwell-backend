import AdminDataSource from '../DataSource/Mongo/AdminDataSource';
/**
 * class EditUser
 */
class EditUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new AdminDataSource().updateUser(data);
  }
}
module.exports = EditUser;
