import UsersDataSource from '../DataSource/Mongo/UsersDataSource';
/**
 * class UpdateUser
 */
class UpdateUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new UsersDataSource().updateUser(data);
  }
}
module.exports = UpdateUser;
