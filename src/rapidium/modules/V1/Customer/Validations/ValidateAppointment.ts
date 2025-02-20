import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class ValidateAppointment
 */
class ValidateAppointment extends BaseValidations {
  public rules = {
    offSet: 'required|string',
    appointmentId: 'required|string',
  };

  public messages = {
    offSet: 'OffSet must provide.',
    appointmentId: 'Appointment id must provide.',
  };
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.setRules(this.rules, this.messages);
  }
}

module.exports = ValidateAppointment;
