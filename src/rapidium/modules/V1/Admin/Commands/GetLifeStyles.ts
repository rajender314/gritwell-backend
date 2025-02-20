import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetLifeStyles
 */
export class GetLifeStyles extends BaseCommand {
  public search: string;
  public page: number;
  public perPage: number;
  public sort: string;
  public column: string;
  public status: Boolean;
  public type: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetLifeStyles.ts';
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
    this.type = data.query.type ? data.query.type : 'recommendations';
  }
}
