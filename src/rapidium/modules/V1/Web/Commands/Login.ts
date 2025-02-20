import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for Login
 */
export class Login extends BaseCommand {
  public username: string;
  public password: string;
  public offset: string;
  public useragent: object;

  public path = __dirname.replace(process.cwd(), '.') + '/Login.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.username = data.body.username ? data.body.username : '';
    this.password = data.body.password ? data.body.password : '';
    this.offset = data.body.offset ? data.body.offset : '-330';
    this.useragent = data.useragent ? data.useragent : '';
  }
}
