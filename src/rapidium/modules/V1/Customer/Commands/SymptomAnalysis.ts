import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class SymptomAnalysis
 */
export class SymptomAnalysis extends BaseCommand {
  public userData: UserProvider;

  public path =
    __dirname.replace(process.cwd(), '.') + '/SymptomAnalysis.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};
  }
}
