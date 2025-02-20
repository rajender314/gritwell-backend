import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class UpdateCoreDysfunction
 */
export class UpdateCoreDysfunction extends BaseCommand {
  public id: string;
  public name: string;
  public status: boolean;

  public path =
    __dirname.replace(process.cwd(), '.') + '/UpdateCoreDysfunction.ts';
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
