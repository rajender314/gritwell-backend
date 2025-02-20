import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for VerifyCustomer
 */
export class VerifyCustomer extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyCustomer.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
