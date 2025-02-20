import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class GetUser
 */
class GetUser extends BaseValidations {
  public rules = {
    search: 'string',
    page: 'number',
    perPage: 'number',
    sort: 'string',
    column: 'string',
    status: 'boolean',
  };

  public messages = {};
  /**
 * constructor
 * @param {data} data
 */
  constructor(data: any) {
    super();
  }
}
module.exports = GetUser;
