import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for VerifyAdmin
 */
export class VerifyAdmin extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyAdmin.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
