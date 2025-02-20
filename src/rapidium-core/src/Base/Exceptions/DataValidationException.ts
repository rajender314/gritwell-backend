import {DomainException} from './DomainException';
/**
 * class DataValidationException
 */
export default class DataValidationException extends DomainException {
  public errors: any;
  /**
   * constructor
   * @param {error} error
   */
  constructor(error:any) {
    super(error, 204);
    this.errors = error;
  }
}
