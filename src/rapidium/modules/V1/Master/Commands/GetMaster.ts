import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetMaster
 */
export class GetMaster extends BaseCommand {
  public type: string;
  public path = __dirname.replace(process.cwd(), '.') + '/GetMaster.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.type = data.query.type ? data.query.type : '';
  }
}
