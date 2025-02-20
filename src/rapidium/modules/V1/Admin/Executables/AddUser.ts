import AdminDataSource from '@basePath/Admin/DataSource/Mongo/AdminDataSource';
/**
 * class AddUser
 */
class AddUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new AdminDataSource().createUser(data);
  }
}
module.exports = AddUser;
