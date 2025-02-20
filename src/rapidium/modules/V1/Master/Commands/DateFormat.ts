import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DateFormat
 */
export class DateFormat extends BaseCommand {
  public path = __dirname.replace(process.cwd(), '.') + '/DateFormat.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
  }
}
