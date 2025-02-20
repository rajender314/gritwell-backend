import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DeleteTest
 */
export class DeleteTest extends BaseCommand {
  public ids: Array<string>;

  public path = __dirname.replace(process.cwd(), '.') + '/DeleteTest.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.ids = data.body.ids ? data.body.ids : [];
  }
}
