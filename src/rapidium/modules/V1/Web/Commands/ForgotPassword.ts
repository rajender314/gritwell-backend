import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
// import { Date, Decimal128, Number, ObjectId } from "mongoose";
// import {StrEncrypt} from '../../Encrypt';
/**
 * Command file for ForgotPassword
 */
export class ForgotPassword extends BaseCommand {
  public email: string;
  public is_password_updated: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/ForgotPassword.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.email = data.body.email;
    this.is_password_updated = false;
  }
}
