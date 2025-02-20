import RoleDataSource from '@basePath/Admin/DataSource/Mongo/RoleDataSource';
/**
 * class GetRoleDetails
 */
class GetRoleDetails {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RoleDataSource().getRoleDetails(data);
  }
}
module.exports = GetRoleDetails;
