import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for verifyGuest
 */
export class VerifyGuest extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyGuest.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
