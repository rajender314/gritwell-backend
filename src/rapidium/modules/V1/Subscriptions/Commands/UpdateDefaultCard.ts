import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class UpdateDefaultCard
 */
export class UpdateDefaultCard extends BaseCommand {
  public userData: UserProvider;
  public cardId : string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/UpdateDefaultCard.ts';

  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
    this.cardId = data.body.cardId;
  }
}
