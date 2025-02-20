import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetTimeSlots
 */
export class GetTimeSlots extends BaseCommand {
  public start_at: string;
  public end_at: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetTimeSlots.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.start_at = data.query.start_at ? data.query.start_at : '';
    this.end_at = data.query.end_at ? data.query.end_at : '';
  }
}
