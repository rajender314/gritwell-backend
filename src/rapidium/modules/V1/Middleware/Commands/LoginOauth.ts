import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for loginOauth
 */
export class LoginOauth extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/LoginOauth.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
