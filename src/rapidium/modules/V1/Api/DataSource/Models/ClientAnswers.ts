import BaseModel from '@rapCoreBase/Models/BaseModel';

import {FormsSchema} from './Schema/FormsSchema';
import {ClientAnswersSchema}
  from '@basePath/Documents/DataSource/Models/Schema/ClientAnswersSchema';
// const environment = process.env;
/**
 * class ClientAnswers
 */
export default class ClientAnswers extends BaseModel {
  private modelDs: any;
  /**
   * constructor
   * @param {ModelName} ModelName
   */
  constructor(ModelName: any) {
    super(ModelName);
    this.modelDs = ModelName;
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async create(data: any) {
    const createData = await this.insertMany(data);
    return createData;
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async update(data: any) {
    const createData = await this.addUpdate(data);
    return createData;
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async remove(data: any) {
    return this.deleteOne(data);
  }
  /**
 * updateTempStatus
 */
  public async updateTempStatus() {
    // const office_user_data = await FormsSchema.updateMany(
    await FormsSchema.updateMany(
        {},
        {temp_status: false},
    );
  }
  /**
 * updateStatus
 */
  public async updateStatus() {
    // const office_user_data = await FormsSchema.updateMany(
    await FormsSchema.updateMany(
        {temp_status: false},
        {status: false},
    );
  }
  /**
* @param {where} where
 * @param {data} data
 */
  public async updateData(where: object, data: object) {
    // const office_user_data = await ClientAnswersSchema.updateMany(
    await ClientAnswersSchema.updateMany(
        where,
        data,
    );
  }
}
