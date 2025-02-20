import BaseModel from '@rapCoreBase/Models/BaseModel';
import {SessionSchema} from './Schema/SessionSchema';
/**
 * Model file for Sessions
 */
export default class Sessions extends BaseModel {
  /**
   * constructor
   */
  constructor() {
    super(SessionSchema);
  }
}
