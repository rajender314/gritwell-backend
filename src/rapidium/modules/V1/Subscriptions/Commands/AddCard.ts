import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class AddCard
 */
export class AddCard extends BaseCommand {
  public userData: UserProvider;
  public stripeTokenId : string;
  public isDefault: Boolean;
  public path =
    __dirname.replace(process.cwd(), '.') + '/AddCard.ts';

  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
    this.stripeTokenId = data.body.stripeTokenId;
    this.isDefault = data.body.isDefault;
  }
}
