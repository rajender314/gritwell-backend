import RoleDataSource from '@basePath/Admin/DataSource/Mongo/RoleDataSource';
/**
 * class GetPermission
 */
class GetPermission {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RoleDataSource().getPermission(data);
  }
}
module.exports = GetPermission;
