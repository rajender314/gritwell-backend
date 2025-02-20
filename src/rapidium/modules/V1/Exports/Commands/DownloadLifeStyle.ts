import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DownloadLifeStyle
 */
export class DownloadLifeStyle extends BaseCommand {
  public search: string;
  public sort: string;
  public column: string;
  public status: Boolean;


  public path = __dirname.replace(process.cwd(), '.') + '/DownloadLifeStyle.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.search = data.query.search ? data.query.search : '';
    this.sort = data.query.sort ? data.query.sort : 'asc';
    this.column = data.query.column ? data.query.column : 'name';
    this.status = data.query.status ? data.query.status : true;
  }
}
