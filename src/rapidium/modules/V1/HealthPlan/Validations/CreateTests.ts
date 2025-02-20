import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class CreateTests
 */
class CreateTests extends BaseValidations {
    public rules = {
        client_id: 'required|string',
        health_plan_id: 'required|string'
    };

    public messages = {
        client_id: 'ClientId Required.'
    };
    /**
   * @param {data} data
   */
    constructor(data: any) {
        super();
        this.setRules(this.rules, this.messages);
    }
}
module.exports = CreateTests;
