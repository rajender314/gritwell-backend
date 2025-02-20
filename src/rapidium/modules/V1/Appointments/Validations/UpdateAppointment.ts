import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class UpdateAppointment
 */
class UpdateAppointment extends BaseValidations {
    public rules = {
        id: 'required|string',
        status: 'required|string'
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
module.exports = UpdateAppointment;
