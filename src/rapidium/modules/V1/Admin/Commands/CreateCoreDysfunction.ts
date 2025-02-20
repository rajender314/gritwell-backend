import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class CreateCoreDysfunction
 */
export class CreateCoreDysfunction extends BaseCommand {
  public name: string;
  public status: boolean;

  public path =
    __dirname.replace(process.cwd(), '.') + '/CreateCoreDysfunction.ts';
  /**
     * constructor
     * @param {data} data
     */
  constructor(data: any) {
    super(data);
    this.name = data.body.name ? data.body.name : '';
    this.status = true;
  }
}
