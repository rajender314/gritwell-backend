import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for VerifyToken
 */
export class VerifyToken extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyToken.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
