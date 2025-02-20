import {DatabaseException} from '@rapCoreBase/Exceptions/DatabaseException';
/**
 * DatabaseError
 */
export class DatabaseError extends DatabaseException {
  /**
   * @param {resource} resource
   * @param {query} query
   */
  constructor(resource, query) {
    super(`${resource}`);
  }
}
