import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetRoleDetails
 */
export class GetRoleDetails extends BaseCommand {
  public id: string;
  public path = __dirname.replace(process.cwd(), '.') + '/GetRoleDetails.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
