import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class ClientCancelSubscription
 */
class ClientCancelSubscription extends BaseValidations {
  public rules = {
    subscriptionId: 'required|string',
  };
  public messages = {
    subscriptionId: 'Subscription id must provide.',
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
module.exports = ClientCancelSubscription;
