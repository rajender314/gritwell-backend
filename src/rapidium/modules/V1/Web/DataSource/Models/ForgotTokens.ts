import BaseModel from '@rapCoreBase/Models/BaseModel';
import {ForgotToken} from '@basePath/Web/Commands/ForgotToken';

/**
 * Model file for ForgotTokens
 */
export default class ForgotTokens extends BaseModel {
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
  public async create(data: ForgotToken) {
    const createToken = await this.addUpdate(data);
    return createToken;
  }
  /**
  * @param {data} data
 * @return {Object}
 */
  public async remove(data: any) {
    return this.deleteOne(data);
  }
}
