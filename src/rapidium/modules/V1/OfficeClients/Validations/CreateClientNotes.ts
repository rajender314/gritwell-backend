import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class CreateClientNotes
 */
class CreateClientNotes extends BaseValidations {
  public rules = {
    client_id: 'required|string',
    note_id: 'required|string',
    description: 'required|string',
  };

  public messages = {
    client_id: 'ClientId Required.',
    note_id: 'NotesId Required.',
    description: 'Description Required.',
  };
  /**
 * @param {data} data
 */
  constructor(data: any) {
    super();
    this.setRules(this.rules, this.messages);
  }
}
module.exports = CreateClientNotes;
