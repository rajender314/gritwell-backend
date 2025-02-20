import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class CreateLifeStyle
 */
export class CreateLifeStyle extends BaseCommand {
  public name: string;
  public description: string;
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/CreateLifeStyle.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.name = data.body.name ? data.body.name : '';
    this.description = data.body.description ? data.body.description : '';
    this.status = true;
  }
}
