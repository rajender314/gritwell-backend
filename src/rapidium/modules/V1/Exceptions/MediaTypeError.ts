import {MediaTypeException} from '@rapCoreBase/Exceptions/MediaTypeException';
/**
 * MediaTypeError
 */
export class MediaTypeError extends MediaTypeException {
  /**
   * @param {resource} resource
   * @param {query} query
   */
  constructor(resource, query) {
    // super(`Resource ${resource} was not found.`);
    super(`${resource}`);
    // this.data = { resource, query };
  }
}
