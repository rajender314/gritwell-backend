import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class CustomerReminderEmails
 */
export class CustomerReminderEmails extends BaseCommand {
  // eslint-disable-next-line
  public path = __dirname.replace(process.cwd(), '.') + '/CustomerReminderEmails.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
  }
}
