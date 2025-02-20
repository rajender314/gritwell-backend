import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class GetDiagnosis
 */
export class GetDiagnosis extends BaseCommand {
  public id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetDiagnosis.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
  }
}
