import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';

/**
 * class ValidateAppointment
 */
export class ValidateAppointment extends BaseCommand {
  public userData: UserProvider;
  public offSet: string;
  public appointmentId: string;
  public path =
    __dirname.replace(process.cwd(), '.') + '/ValidateAppointment.ts';

  /**
     * constructor
     * @param {data} data
     */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};
    this.offSet = data.body.offSet ? data.body.offSet : '';
    this.appointmentId = data.body.appointmentId ? data.body.appointmentId : '';
  }
}
