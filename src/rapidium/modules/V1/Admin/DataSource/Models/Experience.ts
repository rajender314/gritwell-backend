import BaseModel from '@rapCoreBase/Models/BaseModel';
import {GetExperiences} from '@basePath/Admin/Commands/GetExperiences';

// const environment = process.env;
/**
 * class Specialist
 */
export default class Specialist extends BaseModel {
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
 * getExperiences
 * @param {data} data
 * @return {Object}
 */
  public getExperiences(data: GetExperiences) {
    return (
      this.modelDs.find({'status': true}).sort({order: 1})
          .then(async (docs: object) => {
            return docs;
          })
          .catch((error: any) => {
            return error;
          })
    );
  }
}
