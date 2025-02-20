import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for verifyOrgUser
 */
export class VerifyOrgUser extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyOrgUser.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
