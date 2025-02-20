import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class GetCards
 */
export class GetCards extends BaseCommand {
  public userData: UserProvider;
  public path =
    __dirname.replace(process.cwd(), '.') + '/GetCards.ts';

  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
  }
}
