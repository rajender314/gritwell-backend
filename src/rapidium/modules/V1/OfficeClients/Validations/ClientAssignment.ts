import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class ClientAssignment
 */
class ClientAssignment extends BaseValidations {
  public rules = {
    client_id: 'required|string',
    assignment_user_id: 'required|string',
  };

  public messages = {
    client_id: 'ClientId Required.',
    assignment_user_id: 'Assignment Required.',
  };
  /**
 * @param {data} data
 */
  constructor(data: any) {
    super();
    this.setRules(this.rules, this.messages);
  }
}
module.exports = ClientAssignment;
