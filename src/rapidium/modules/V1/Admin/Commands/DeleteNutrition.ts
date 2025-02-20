import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DeleteNutrition
 */
export class DeleteNutrition extends BaseCommand {
  public ids: Array<string>;

  public path = __dirname.replace(process.cwd(), '.') + '/DeleteNutrition.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.ids = data.body.ids ? data.body.ids : [];
  }
}
