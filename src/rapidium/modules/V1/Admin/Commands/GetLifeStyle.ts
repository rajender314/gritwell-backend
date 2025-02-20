import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetLifeStyle
 */
export class GetLifeStyle extends BaseCommand {
  public id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetLifeStyle.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
