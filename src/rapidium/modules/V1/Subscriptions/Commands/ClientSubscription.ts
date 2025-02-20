import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class ClientSubscription
 */
export class ClientSubscription extends BaseCommand {
  public userData: UserProvider;


  public cardId: string;
  public planSlug: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/ClientSubscription.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};


    this.cardId = data.body.cardId;
    this.planSlug = data.body.planSlug;
  }
}
