import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetGoals
 */
export class GetGoals extends BaseCommand {
  public search: string;
  public page: number;
  public perPage: number;
  public sort: string;
  public column: string;
  public status: Boolean;


  public path = __dirname.replace(process.cwd(), '.') + '/GetGoals.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.search = data.query.search ? data.query.search : '';
    this.page = data.query.page ? parseInt(data.query.page) : 1;
    this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
    this.sort = data.query.sort ? data.query.sort : 'DESC';
    this.column = data.query.column ? data.query.column : 'uuid';
    this.status = data.query.status ? data.query.status : true;
  }
}
