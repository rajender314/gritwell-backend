import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class UpdateUser
 */
class UpdateUser extends BaseValidations {
  public rules = {
    id: 'required|string',
    first_name: 'required|string',
    last_name: 'required|string',
    phone: 'required|number',
    status: 'required|boolean',
    role_id: 'required|string',
  };

  public messages = {
    name: 'Email already exists.',
    first_name: 'First name must provide.',
    last_name: 'Last name must provide.',
    phone: 'Phone must provide.',
    status: 'status must provide.'
  };
  /**
 * constructor
 * @param {data} data
 */
  constructor(data: any) {
    super();

    this.setRules(
        this.rules,
        this.messages,
    );
  }
}
module.exports = UpdateUser;
