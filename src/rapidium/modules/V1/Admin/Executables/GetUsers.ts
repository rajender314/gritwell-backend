import UsersDataSource from '../DataSource/Mongo/UsersDataSource';
/**
 * class GetUsers
 */
class GetUsers {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new UsersDataSource().getUsers(data);
  }
}
module.exports = GetUsers;
