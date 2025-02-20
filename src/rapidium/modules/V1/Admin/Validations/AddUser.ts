import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
/**
 * class AddUser
 */
class AddUser extends BaseValidations {
  public rules = {
    first_name: 'required|string',
    last_name: 'required|string',
    email: 'required|string|email',
    role_id: 'required|string',
    phone: 'required|number',
    status: 'required|boolean',
  };
  // public rules = {

  // };
  public messages = {
    name: 'Email already exists.',
    first_name: 'First name must provide.',
    last_name: 'Last name must provide.',
    email: 'Email must provide.',
    role_id: 'Role must provide.',
    phone: 'Phone must provide.',
    status: 'status must provide.',
  };
  /**
 * constructor
 * @param {data} data
 */
  constructor(data: any) {
    super();

    this.setAdminRules(this.rules, this.messages, UserSchema, 'email', 'id');
  }
}
module.exports = AddUser;
