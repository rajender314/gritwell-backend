import Role from '@basePath/Admin/DataSource/Models/Role';
import {RoleSchema} from '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import {PermissionSchema}
  from '@basePath/Admin/DataSource/Models/Schema/PermissionSchema';
import {GetRoleDetails} from '@basePath/Admin/Commands/GetRoleDetails';
// import LogsDataSource from '@basePath/Logs/DataSource/Mongo/LogsDataSource';
// import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
// import {ObjectId} from '@rapCore/src/Mongodb/Types';

/**
 * class RoleDataSource
 */
export default class RoleDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async updateRole(data: any) {
    return await new Role(RoleSchema).updateRole(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getRole(data: any) {
    return await new Role(RoleSchema).getRoles(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getPermission(data: any) {
    return new Role(PermissionSchema).getPermission(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getRoleDetails(data: GetRoleDetails) {
    return await new Role(RoleSchema).getRoleDetails(data);
  }
}
