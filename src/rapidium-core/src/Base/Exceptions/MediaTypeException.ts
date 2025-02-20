import {DomainException} from './DomainException';
/**
 * class MediaTypeException
 */
export class MediaTypeException extends DomainException {
  /**
   * constructor
   * @param {message} message
   */
  constructor(message) {
    super(message, 415);
    this.name = this.constructor.name;
  }
}
