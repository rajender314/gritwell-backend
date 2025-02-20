import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class AppointmentPayment
 */
class AppointmentPayment extends BaseValidations {
  public rules = {

    cardId: 'required|string',
    appointmentId: 'required|string',
  };

  public messages = {

    cardId: 'Card id must provide.',
    appointmentId: 'Appointment id must provide.',
  };
  /**
         * constructor
         * @param {data} data
         */
  constructor(data: any) {
    super();

    this.setAdminRules(this.rules, this.messages, '', '', '');
  }
}

module.exports = AppointmentPayment;
