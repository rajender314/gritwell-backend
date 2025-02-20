import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class MyTests
 */
export class MyTests extends BaseCommand {
  public userData: UserProvider;
  public planDate: string;

  public path = __dirname.replace(process.cwd(), '.') + '/MyTests.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};
    this.planDate = data.query.planDate ? data.query.planDate : '';
  }
}
