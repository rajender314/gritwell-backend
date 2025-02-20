import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DeleteLifeStyle
 */
export class DeleteLifeStyle extends BaseCommand {
  public ids: Array<string>;

  public path = __dirname.replace(process.cwd(), '.') + '/DeleteLifeStyle.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.ids = data.body.ids ? data.body.ids : [];
  }
}
