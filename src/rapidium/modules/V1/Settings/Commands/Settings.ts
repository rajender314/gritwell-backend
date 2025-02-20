import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for Settings
 */
export class Settings extends BaseCommand {
  public stopOutgoingEmails: Boolean;
  public useragent: Object;
  public path =
    __dirname.replace(process.cwd(), '.') + '/Settings.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.stopOutgoingEmails = data.body.stop_outgoing_emails ?
      data.body.stop_outgoing_emails :
      false;
    this.useragent = data.useragent ? data.useragent : '';
  }
}
