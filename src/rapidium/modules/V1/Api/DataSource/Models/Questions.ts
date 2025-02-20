import BaseModel from '@rapCoreBase/Models/BaseModel';
import {SyncTypeForms} from '@basePath/Api/Commands/SyncTypeForms';
import {QuestionsSchema}
  from '@basePath/Documents/DataSource/Models/Schema/QuestionsSchema';
/**
 * class Questions
 */
export default class Questions extends BaseModel {
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
    // const office_user_data = await QuestionsSchema.updateMany(
    await QuestionsSchema.updateMany(
        {},
        {temp_status: false},
    );
  }
  /**
 * updateStatus
 */
  public async updateStatus() {
    // const office_user_data = await QuestionsSchema.updateMany(
    await QuestionsSchema.updateMany(
        {temp_status: false},
        {status: false},
    );
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async getQuestions(data: any={}) {
    return await this.modelDs.find().then(async (doc: []) => {
      const response = {};
      if (doc) {
        // const formsByid = doc.map((item: any) => {
        doc.map((item: any) => {
          response[item.typeform_question_id] = item;
          return response;
        });
        return response;
      }
    });
  }
}
