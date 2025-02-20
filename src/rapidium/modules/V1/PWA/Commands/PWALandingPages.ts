import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for PWALandingPages
 */
export class PWALandingPages extends BaseCommand {
  public response: object;

  public path = __dirname.replace(process.cwd(), '.') + '/PWALandingPages.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.response = data.body;
  }
}
