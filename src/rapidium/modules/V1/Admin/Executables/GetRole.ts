import RoleDataSource from '@basePath/Admin/DataSource/Mongo/RoleDataSource';
/**
 * class GetRole
 */
class GetRole {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RoleDataSource().getRole(data);
  }
}
module.exports = GetRole;
