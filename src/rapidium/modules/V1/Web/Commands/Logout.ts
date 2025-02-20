import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
// import { Date, Decimal128, Number, ObjectId } from "mongoose";
// import {StrEncrypt} from '../../Encrypt';
/**
 * Command file for Logout
 */
export class Logout extends BaseCommand {
  public id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/Logout.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.body.id ? data.body.id : '';
  }
}
