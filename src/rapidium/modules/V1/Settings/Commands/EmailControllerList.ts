import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for EmailControllerList
 */
export class EmailControllerList extends BaseCommand {
  public page: number;
  public perPage: number;
  public path =
    __dirname.replace(process.cwd(), '.') + '/EmailControllerList.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.page = data.query.page ? parseInt(data.query.page) : 1;
    this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 10;
  }
}
