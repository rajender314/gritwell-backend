import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
// import {StrEncrypt} from '../../Encrypt';
/**
 * Command file for ForgotToken
 */
export class ForgotToken extends BaseCommand {
  public token_id: String;
  public email: String;
  public user_id: String;
  public type: String;


  public path = __dirname.replace(process.cwd(), '.') + '/ForgotToken.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.token_id = data.body.token_id;
    this.email = data.body.email;
    this.user_id = data.body.id;
    this.type = data.body.type;
  }
}
