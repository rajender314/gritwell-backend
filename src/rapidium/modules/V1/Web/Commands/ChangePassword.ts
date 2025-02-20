import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command file for ChangePassword
 */
export class ChangePassword extends BaseCommand {
  public oldPassword: string;
  public password: string;
  public confirmPassword: string;
  public userData: UserProvider;

  public path =
    __dirname.replace(process.cwd(), '.') + '/ChangePassword.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.password = data.body.password ? data.body.password : '';
    this.oldPassword = data.body.oldPassword ? data.body.oldPassword : '';
    this.confirmPassword =
      data.body.confirmPassword ? data.body.confirmPassword : '';
    this.userData = data.decoded ? data.decoded : {};
  }
}
