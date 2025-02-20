import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class ClientResumeSubscription
 */
export class ClientResumeSubscription extends BaseCommand {
  public userData: UserProvider;
  public subscriptionId: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/ClientResumeSubscription.ts';

  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
    this.subscriptionId = data.body.subscriptionId ?
      data.body.subscriptionId : '';
  }
}
