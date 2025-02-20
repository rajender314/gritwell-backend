import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
// import { Date, Decimal128, Number, ObjectId } from "mongoose";
// import {StrEncrypt} from '../../Encrypt';
/**
 * Command file for ResetPassword
 */
export class ResetPassword extends BaseCommand {
  public token_id: string;
  public password: string;
  public confirm_password: string;
  public type: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/ResetPassword.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.token_id = data.body.token_id;
    this.password = data.body.password ? data.body.password : '';
    this.confirm_password =
      data.body.confirm_password ? data.body.confirm_password : '';
    this.type = data.body.type;
  }
}
