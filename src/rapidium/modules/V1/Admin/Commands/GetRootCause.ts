import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetRootCause
 */
export class GetRootCause extends BaseCommand {
  public id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetRootCause.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
