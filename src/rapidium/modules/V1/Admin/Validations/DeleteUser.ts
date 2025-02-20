import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class DeleteUser
 */
class DeleteUser extends BaseValidations {
  public rules = {
    id: 'required|string',
  };

  public messages = {
    id: '',
  };
  /**
 * constructor
 * @param {data} data
 */
  constructor(data: any) {
    super();
  }
}
module.exports = DeleteUser;
