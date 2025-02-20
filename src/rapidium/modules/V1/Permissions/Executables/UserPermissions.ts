import UserPermissionsDataSource from '../DataSource/Mongo/UserPermissionsDataSource';
/**
 * class UserPermissions
 */
class UserPermissions {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new UserPermissionsDataSource().get(data);
  }
}

module.exports = UserPermissions;
