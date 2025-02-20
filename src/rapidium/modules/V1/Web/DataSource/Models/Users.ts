import BaseModel from '@rapCoreBase/Models/BaseModel';
import {UserSchema} from '../../../Admin/DataSource/Models/Schema/UserSchema';
/**
 * Model file for Sessions
 */
export default class Sessions extends BaseModel {
  /**
   * constructor
   */
  constructor() {
    super(UserSchema);
  }
}
