import RoleUsersDataSource from '../DataSource/Mongo/RoleUsersDataSource';
/**
 * class GetRoleBasedUsers
 */
class GetRoleBasedUsers {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new RoleUsersDataSource().getUsers(data);
  }
}

module.exports = GetRoleBasedUsers;
