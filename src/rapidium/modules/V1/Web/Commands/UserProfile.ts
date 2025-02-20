import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command file for UserProfile
 */
export class UserProfile extends BaseCommand {
  public userData: UserProvider;
  public path = __dirname.replace(process.cwd(), '.') + '/UserProfile.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
  }
}
