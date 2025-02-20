import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
// import {StrEncrypt} from '../../Encrypt';
/**
 * Command file for AdminResetPassword
 */
export class AdminResetPassword extends BaseCommand {
  public email: string;
  public is_password_updated: boolean;
  public admin_reset_password: boolean;

  public path =
    __dirname.replace(process.cwd(), '.') + '/AdminResetPassword.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.email = data.body.email;
    this.is_password_updated = false;
    this.admin_reset_password = true;
  }
}
