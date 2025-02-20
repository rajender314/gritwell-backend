import {DomainException} from './DomainException';
/**
 * class DatabaseException
 */
export class DatabaseException extends DomainException {
  /**
   * constructor
   * @param {message} message
   */
  constructor(message) {
    super(message, 402);
    this.name = this.constructor.name;
  }
}
