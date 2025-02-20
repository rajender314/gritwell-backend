import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class UpdateDefaultCard
 */
class UpdateDefaultCard extends BaseValidations {
  public rules = {
    cardId: 'required|string',

  };
  public messages = {
    cardId: 'Card id must provide.',

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

module.exports = UpdateDefaultCard;
