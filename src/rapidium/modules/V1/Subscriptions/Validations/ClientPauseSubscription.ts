import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class ClientPauseSubscription
 */
class ClientPauseSubscription extends BaseValidations {
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
module.exports = ClientPauseSubscription;
