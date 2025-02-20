import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class PwaSignInDocs
 */
export class PwaSignInDocs extends BaseCommand {
  public response: object;

  public path = __dirname.replace(process.cwd(), '.') + '/PwaSignInDocs.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.response = data.body;
  }
}
