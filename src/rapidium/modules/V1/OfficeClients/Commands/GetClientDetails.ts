import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
/**
 * class GetClientDetails
 */
export class GetClientDetails extends BaseCommand {
  public id: string;
  public userData: UserProvider;
  public path = __dirname.replace(process.cwd(), '.') + '/GetClientDetails.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.userData = data.decoded ? data.decoded : {};
  }
}
