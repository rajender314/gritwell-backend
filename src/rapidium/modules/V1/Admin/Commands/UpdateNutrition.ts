import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class UpdateNutrition
 */
export class UpdateNutrition extends BaseCommand {
  public id: string;
  public name: string;
  public description: string;
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/UpdateNutrition.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.name = data.body.name ? data.body.name : '';
    this.description = data.body.description ? data.body.description : '';
    this.status = data.body.status ? data.body.status : false;
  }
}
