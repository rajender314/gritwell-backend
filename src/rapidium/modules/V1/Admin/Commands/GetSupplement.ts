import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetSupplement
 */
export class GetSupplement extends BaseCommand {
  public id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetSupplement.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
