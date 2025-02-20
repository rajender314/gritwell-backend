import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class UpdateGoal
 */
export class UpdateGoal extends BaseCommand {
  public id: string;
  public name: string;
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/UpdateGoal.ts';
  /**
     * constructor
     * @param {data} data
     */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.name = data.body.name ? data.body.name : '';
    this.status = data.body.status ? data.body.status : false;
  }
}
