import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class ClientSubscription
 */
class ClientSubscription extends BaseValidations {
  public rules = {

    cardId: 'required|string',
    planSlug: 'required|string',
  };
  public messages = {

    cardId: 'Payment id must provide.',
    planSlug: 'Plan slug must provide.',
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

module.exports = ClientSubscription;
