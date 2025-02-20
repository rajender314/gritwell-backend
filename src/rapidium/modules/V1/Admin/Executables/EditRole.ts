import RoleDataSource from '@basePath/Admin/DataSource/Mongo/RoleDataSource';
/**
 * class EditRole
 */
class EditRole {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new RoleDataSource().updateRole(data);
  }
}
module.exports = EditRole;
