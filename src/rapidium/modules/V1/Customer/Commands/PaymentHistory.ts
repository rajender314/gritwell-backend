import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
// import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class PaymentHistory
 */
export class PaymentHistory extends BaseCommand {
  public userId: string;

  public path = __dirname.replace(process.cwd(), '.') + '/PaymentHistory.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userId = data.params.userId ? data.params.userId : {};
  }
}
