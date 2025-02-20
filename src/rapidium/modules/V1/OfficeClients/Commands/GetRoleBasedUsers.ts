import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetRoleBasedUsers
 */
export class GetRoleBasedUsers extends BaseCommand {
  public slug: string;
  public search: string;
  public timezone: string;
  public experience: string;
  public specialists: string;
  public weekdays: string;
  public page: number;
  public perPage: number;
  public sort: string;
  public column: string;
  public status: Boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/GetRoleBasedUsers.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.slug = data.params.slug ? data.params.slug : '';
    this.search = data.query.search ? data.query.search : '';
    this.timezone = data.query.timezone ? data.query.timezone : '';
    this.experience = data.query.experience ? data.query.experience : '';
    this.specialists = data.query.specialists ? data.query.specialists : '';
    this.weekdays = data.query.weekdays ? data.query.weekdays : '';
    this.page = data.query.page ? parseInt(data.query.page) : 1;
    this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
    this.sort = data.query.sort ? data.query.sort : 'asc';
    this.column = data.query.column ? data.query.column : 'first_name';
    this.status = data.query.status ? data.query.status : true;
  }
}
