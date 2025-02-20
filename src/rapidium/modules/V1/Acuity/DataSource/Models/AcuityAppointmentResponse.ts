import BaseModel from '@rapCoreBase/Models/BaseModel';


/**
 * class AcuiytAppointmentResponse
 */
export default class AcuiytAppointmentResponse extends BaseModel {
  private modelDs: any;
  /**
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
    const createData = await this.addUpdate(data);
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
}
