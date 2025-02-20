import { UserPermissions }
    from '@basePath/Permissions/Commands/UserPermissions';
import { DateFormat } from '@basePath/Master/Commands/DateFormat';
import { RoleSchema } from
    '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import { PermissionSchema } from
    '@basePath/Admin/DataSource/Models/Schema/PermissionSchema';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
 * class UserPermissionsDataSource
 */
export default class UserPermissionsDataSource {
    /**
      * @param {data} data
     * @return {Object}
     */

    async get(data: UserPermissions) {
        try {
            const permissions = await this.getPermissions(data);
            const dateFormat = await this.getDateFormat(data);
            return { permissions, date_format: dateFormat };
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
    async getPermissions(data: UserPermissions) {
        try {
            const permissions = await PermissionSchema.find({});
            const permissionsData: any = [];
            const permissionsCodeData: any = [];
            let permissionObj: any = {};
            if (permissions.length) {
                permissions.map(permission => {
                    permissionsCodeData[permission._id] = permission.code;
                })
            }
            const role = await RoleSchema.findById(ObjectId(data.userData.role_id));
            if (role != null) {
                for (let [permissionId, value] of Object.entries(role.permission)) {
                    if (permissionsCodeData[permissionId]) {
                        permissionObj = {
                            key: permissionsCodeData[permissionId],
                            value: value
                        }
                        permissionsData.push(permissionObj);
                    }
                }
            }
            return permissionsData;
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    async getDateFormat(data) {
        const dateFormatCommand = new DateFormat(data);
        return await new CommandFactory().getCommand(
            dateFormatCommand.path,
            true,
            dateFormatCommand
        );
    }
}
