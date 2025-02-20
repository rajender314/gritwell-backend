import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class SyncSetConsent
 */
export class SyncSetConsent extends BaseCommand {
  public response: object;
  public sync_type: string;
  public path = __dirname.replace(process.cwd(), '.') + '/SyncSetConsent.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.response = data.body;
    this.sync_type = data.sync_type;
  }
}
