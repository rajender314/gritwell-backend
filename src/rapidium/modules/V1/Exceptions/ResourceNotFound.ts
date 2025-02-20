// import { DomainException } from "@rapCoreBase/Exceptions/DomainException";
import {NorecordException} from '@rapCoreBase/Exceptions/NorecordException';
/**
 * ResourceNotFound
 */
export class ResourceNotFound extends NorecordException {
  /**
   * @param {resource} resource
   * @param {query} query
   */
  constructor(resource, query) {
    super(`${resource}`, 402);

    // this.data = { resource, query };
  }
}
/**
 * ResourceRecordNotFound
 */
export class ResourceRecordNotFound extends NorecordException {
  /**
   * @param {resource} resource
   * @param {query} query
   */
  constructor(resource, query) {
    super(`${resource}`);

    // this.data = { resource, query };
  }
}
