import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';

/**
 * class Appointments
 */
export class Appointments extends BaseCommand {
  public userData: UserProvider;
  public onlyFirstAppointment: string;
  public type: string;
  public path = __dirname.replace(process.cwd(), '.') + '/Appointments.ts';

  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};
    this.onlyFirstAppointment = data.query.onlyFirstAppointment ?
      data.query.onlyFirstAppointment :
      'two';
    this.type = data.query.type ? data.query.type :'upcoming';
  }
}
