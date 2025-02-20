import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class AddCard
 */
class AddCard extends BaseValidations {
  public rules = {
    stripeTokenId: 'required|string',
    isDefault: 'required|Boolean',
  };
  public messages = {
    stripeTokenId: 'Card token id must provide.',
    isDefault: 'isDefault must provide.',
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

module.exports = AddCard;
