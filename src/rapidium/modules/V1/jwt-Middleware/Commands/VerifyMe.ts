import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for VerifyMe
 */
export class VerifyMe extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyMe.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
