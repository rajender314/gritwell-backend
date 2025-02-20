import {DomainException} from './DomainException';
/**
 * class NorecordException
 */
export class NorecordException extends DomainException {
  /**
   * constructor
   * @param {message} message
   * @param {errorCode} errorCode
   */
  constructor(message, errorCode = 402) {
    super(message, errorCode);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential,
    // but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }
}
