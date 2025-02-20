import BaseModel from '@rapCoreBase/Models/BaseModel';
import {LogSchema} from './Schema/LogSchema';
/**
 * Logs
 */
export default class Logs extends BaseModel {
  /**
   * constructor
   */
  constructor() {
    super(LogSchema);
  }
}
