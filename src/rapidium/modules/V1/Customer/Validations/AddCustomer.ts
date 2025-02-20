import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * Validation class for AddCustomer
 */
class AddCustomer extends BaseValidations {
  public rules = {
    first_name: 'required|string',
    last_name: 'required|string',
    email: 'required|string|email',
    phone: 'required|string',
  };
  // public rules = {

  // };
  public messages = {
    first_name: 'First name must provide.',
    last_name: 'Last name must provide.',
    email: 'Email must provide.',
    phone: 'phone number must provide.',
  };
  /**
 * @param {data} data
 */
  constructor(data: any) {
    super();

    this.setAdminRules(this.rules, this.messages, '', '', '');
  }
}
module.exports = AddCustomer;
