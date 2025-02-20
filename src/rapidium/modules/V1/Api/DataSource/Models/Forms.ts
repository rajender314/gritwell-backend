import BaseModel from '@rapCoreBase/Models/BaseModel';
import { SyncTypeForms } from '@basePath/Api/Commands/SyncTypeForms';

// import {now} from 'mongoose';
import { FormsSchema } from './Schema/FormsSchema';
// const environment = process.env;
/**
 * class Forms
 */
export default class Forms extends BaseModel {
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
  public async update(data: SyncTypeForms) {
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
      { temp_status: false },
    );
  }
  /**
 * updateStatus
 */
  public async updateStatus() {
    // const office_user_data = await FormsSchema.updateMany(
    await FormsSchema.updateMany(
      { temp_status: false },
      { status: false },
    );
  }
  /**
 * getForms
 * @param {data} data
 * @return {Object}
 */
  public async getForms(data: any = {}) {
    return await this.modelDs.find().then(async (doc: []) => {
      const response = {};
      if (doc) {
        doc.map((item: any) => {
          response[item.type_form_id] = item;
          return response;
        });
        return response;
      }
    });
  }
}
