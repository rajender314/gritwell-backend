import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for VerifyRole
 */
export class VerifyRole extends BaseCommand {
  public data: any;
  // public routeInfo: any;
  public routePath: any;
  public method: any;
  public token: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyRole.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
    // this.routeInfo = data.route;
    this.data.routePath = data.route.path;
    this.method = data.method;
    this.data.token = data.headers.authorization;
  }
}
