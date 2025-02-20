import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for verifyAuthorizationToken
 */
export class VerifyAuthorizationToken extends BaseCommand {
  public data: any;

  public path =
    __dirname.replace(process.cwd(), '.') + '/VerifyAuthorizationToken.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
