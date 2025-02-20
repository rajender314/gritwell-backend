import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class AppointmentPayment
 */
export class AppointmentPayment extends BaseCommand {
  public userData: UserProvider;

  public cardId: string;
  public appointmentId: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/AppointmentPayment.ts';

  /**
     * constructor
     * @param {data} data
     */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};

    this.cardId = data.body.cardId;
    this.appointmentId = data.body.appointmentId;
  }
}
