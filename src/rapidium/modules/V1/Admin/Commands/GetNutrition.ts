import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetNutrition
 */
export class GetNutrition extends BaseCommand {
  public id: string;


  public path = __dirname.replace(process.cwd(), '.') + '/GetNutrition.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
