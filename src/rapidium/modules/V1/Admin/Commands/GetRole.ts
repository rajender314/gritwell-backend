import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetRole
 */
export class GetRole extends BaseCommand {
  public id: string;
  public name: string;
  public permission: Object;
  public order: Number;
  public search: string;
  public page: number;
  public perPage: number;
  public sort: string;
  public column: string;
  public status: Boolean;
  public exclude_admin: Boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/GetRole.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.query.id ? data.query.id : '';
    this.name = data.query.name ? data.query.name : '';
    this.permission = data.query.permission ? data.query.permission : {};
    this.order = data.query.order ? data.query.order : '';
    this.search = data.query.search ? data.query.search : '';
    this.page = data.query.page ? parseInt(data.query.page) : 1;
    this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
    this.sort = data.query.sort ? data.query.sort : 'asc';
    this.column = data.query.column ? data.query.column : 'first_name';
    this.status = data.query.status?data.query.status: true;
    this.exclude_admin = data.query.exclude_admin ?
    data.query.exclude_admin :
    false;
  }
}
