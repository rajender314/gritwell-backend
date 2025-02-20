import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DeleteSupplement
 */
export class DeleteSupplement extends BaseCommand {
  public ids: Array<string>;

  public path = __dirname.replace(process.cwd(), '.') + '/DeleteSupplement.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.ids = data.body.ids ? data.body.ids : [];
  }
}
