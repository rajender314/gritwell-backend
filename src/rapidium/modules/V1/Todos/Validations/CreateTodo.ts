import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class CreateTodo
 */
class CreateTodo extends BaseValidations {
    public rules = {
        client_id: 'required|string',
        action: 'required|string'
    };

    public messages = {
        client_id: 'ClientId Required.',
        action: 'ClientId Required.'
    };
    /**
   * @param {data} data
   */
    constructor(data: any) {
        super();
        this.setRules(this.rules, this.messages);
    }
}
module.exports = CreateTodo;
