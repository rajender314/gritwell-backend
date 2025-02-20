import BaseModel from '@rapCoreBase/Models/BaseModel';
import {GetRole} from '@basePath/Admin/Commands/GetRole';
import {GetPermission} from '@basePath/Admin/Commands/GetPermission';
import {EditRole} from '@basePath/Admin/Commands/EditRole';
import {GetRoleDetails} from '@basePath/Admin/Commands/GetRoleDetails';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {GetMaster} from '@basePath/Master/Commands/GetMaster';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
/**
 * class Roles
 */
export default class Roles extends BaseModel {
  private modelDs: any;
  /**
   * @param {ModelName}  ModelName
   */
  constructor(ModelName: any) {
    super(ModelName);
    this.modelDs = ModelName;
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getRoles(data: GetRole) {
    let query: any = {status: true};
    if (data.exclude_admin) {
      query = {status: true, name: {$ne: 'Admin'}};
    }
    const totalRoles = await this.modelDs
        .find(query)
        .countDocuments()
        .then((count) => {
          return count;
        });
    return this.modelDs
        .find(query)
        .select({name: 1})
        .sort({order: 1})
        .then(async (role: any) => {
          if (role) {
            return {result: role, count: totalRoles};
          } else {
            return 'There are no roles exists';
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
   * @param {element} element
   * @param {experiences} experiences
   * @param {specialists} specialists
   * @param {weekdays} weekdays
   * @param {timezones} timezones
   * @return {Object}
   */
  public roleColumnMapping(
      element,
      experiences,
      specialists,
      weekdays,
      timezones,
  ) {
    if (element['custome_fields']) {
      element['custome_fields'].forEach((value, index) => {
        if (value.type == 'select') {
          if (value.table_schema == 'experienceSchema') {
            value.option = experiences;
          }
          if (value.table_schema == 'WeekDaysSchema') {
            value.option = weekdays;
          }
          if (value.table_schema == 'timeZoneSchema') {
            value.option = timezones;
          }
        }
        if (value.type == 'hierarchy_select') {
          if (value.table_schema == 'specializationSchema') {
            value.option = specialists;
          }
        }
        element.custome_fields[index] = value;
      });
    }
    return element;
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  public getPermission(data: GetPermission) {
    return this.modelDs
        .find({status: true})
        .sort({order: 1})
        .then(async (docs: object) => {
          if (docs) {
            const propertyValues = Object.values(docs);
            const parentPermissions: any = [];
            const childPermissions: any = [];
            propertyValues.forEach((element: any) => {
              element.id = element._id;
              if (element['parent_order']) {
                childPermissions.push(element);
              } else {
                parentPermissions.push(element);
              }
            });

            parentPermissions.forEach((parent: any) => {
              childPermissions.forEach((child: any) => {
                if (parent['order'] == child['parent_order']) {
                  parent['children'] = [...parent['children'], child];
                }
              });
            });
            return parentPermissions;
          } else {
            return 'There are no permissions exists';
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async updateRole(data: EditRole) {
    if (data.id) {
      const checkRole = await this.modelDs
          .find({
            _id: {$ne: data.id},
            name: data.name.replace(/^\s+|\s+$/gm, ''),
          })
          .countDocuments();
      if (checkRole != 0) {
        throw new ResourceNotFound(
            `${data.name} is not available. Please use another Name`,
            '',
        );
      }
      return await this.modelDs.findByIdAndUpdate(
          data.id,
          {name: data.name, permission: data.permission},
          {new: true},
      );
    } else {
      return 'Unable to update the role, please check the data';
    }
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getRoleDetails(data: GetRoleDetails) {
    const masterCommand = new GetMaster({
      query: {type: 'timezones,experiences,specialists,weekdays'},
    });
    const {experiences, specialists, weekdays, timezones} =
      await new CommandFactory().getCommand(
          masterCommand.path,
          true,
          masterCommand,
      );

    return this.modelDs
        .findById(data.id)
        .select({
          name: 1,
          permission: 1,
          custome_fields: 1,
          assign_client_to: 1,
        })
        .then(async (role: any) => {
          return this.roleColumnMapping(
              role,
              experiences,
              specialists,
              weekdays,
              timezones,
          );
        })
        .catch((error: any) => {
          return error;
        });
  }
}
