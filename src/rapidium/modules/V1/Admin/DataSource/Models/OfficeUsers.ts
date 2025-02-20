import BaseModel from '@rapCoreBase/Models/BaseModel';
import {OfficeUser} from '@basePath/Admin/Commands/OfficeUser';
// import { OfficeUserSchema }
//  from "@basePath/Admin/DataSource/Models/Schema/OfficeUserSchema";
// import {now} from 'mongoose';
// const environment = process.env;
/**
 * class OfficeUsers
 */
export default class OfficeUsers extends BaseModel {
  private modelDs: any;
  /**
   * constructor
   * @param {ModelName} ModelName
   */
  constructor(ModelName:any) {
    super(ModelName);
    this.modelDs = ModelName;
  }
  /**
  * @param {data} data
 * @return {Object}
 */
  public async create(data: OfficeUser) {
    const createUser = await this.addUpdate(data);
    return createUser;
  }
  /**
  * @param {data} data
 * @return {Object}
 */
  public async remove(data: any) {
    return this.deleteOne(data);
  }
}
