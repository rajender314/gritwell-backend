import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetUserDetails
 */
export class GetUserDetails extends BaseCommand {
  public id: string;
  public path = __dirname.replace(process.cwd(), '.') + '/GetUserDetails.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
