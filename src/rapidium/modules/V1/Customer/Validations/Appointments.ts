import BaseValidations from '@rapCoreBase/Validations/BaseValidations';
/**
 * class Appointments
 */
class Appointments extends BaseValidations {
  public rules = {

    onlyFirstAppointment: 'string',
  };

  public messages = {
    onlyFirstAppointment: 'OnlyFirstAppointment must be string',
  };
  /**
     * constructor
     * @param {data} data
     */
  constructor(data: any) {
    super();
  }
}
module.exports = Appointments;
