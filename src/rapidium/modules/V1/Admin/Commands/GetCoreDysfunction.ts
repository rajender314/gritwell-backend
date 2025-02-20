import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetCoreDysfunction
 */
export class GetCoreDysfunction extends BaseCommand {
  public id: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/GetCoreDysfunction.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
