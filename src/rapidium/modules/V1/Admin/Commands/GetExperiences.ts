import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetExperiences
 */
export class GetExperiences extends BaseCommand {
  public id: string;
  public name: string;
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/GetExperiences.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.body.id ? data.body.id : '';
    this.name = data.body.first_name ? data.body.first_name : '';
    this.status = data.body.status ? data.body.status : true;
  }
}
