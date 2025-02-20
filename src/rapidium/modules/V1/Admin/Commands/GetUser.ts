import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetUser
 */
export class GetUser extends BaseCommand {
  public id: string;
  public search: string;
  public page: number;
  public perPage: number;
  public sort: string;
  public column: string;
  public status: Boolean;
  public user_type : number;

  public path = __dirname.replace(process.cwd(), '.') + '/GetUser.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.query.id ? data.query.id : '';
    this.search = data.query.search ? data.query.search : '';
    this.page = data.query.page ? parseInt(data.query.page) : 1;
    this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
    this.sort = data.query.sort ? data.query.sort : 'ASC';
    this.column = data.query.column ? data.query.column : 'first_name';
    this.status = data.query.status?data.query.status: true;
    this.user_type = data.query.user_type ? parseInt(data.query.user_type) : 1;
  }
}
