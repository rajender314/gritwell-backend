import {DomainException} from './DomainException';
/**
 * class MiddlewareException
 */
export class MiddlewareException extends DomainException {
  /**
   * constructor
   * @param {message} message
   * @param {errorCode} errorCode
   */
  constructor(message, errorCode = 401) {
    super(message, errorCode);
    this.name = this.constructor.name;
  }
}
