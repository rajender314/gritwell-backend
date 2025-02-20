import BaseModel from '@rapCoreBase/Models/BaseModel';
import {Settings as SettingsCmd} from '@basePath/Settings/Commands/Settings';

// const environment = process.env;
/**
 * DataSource file for Settings
 */
export default class Settings extends BaseModel {
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
   */
  public update(data: SettingsCmd) {
  }
}
