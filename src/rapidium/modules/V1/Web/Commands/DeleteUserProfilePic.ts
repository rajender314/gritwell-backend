import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command file for DeleteUserProfilePic
 */
export class DeleteUserProfilePic extends BaseCommand {
  public userData: UserProvider;
  public path =
    __dirname.replace(process.cwd(), '.') + '/DeleteUserProfilePic.ts';
  /**
     * @param {data} data
     */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
  }
}
