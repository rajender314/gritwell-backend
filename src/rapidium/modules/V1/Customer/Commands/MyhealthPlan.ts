import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class MyhealthPlan
 */
export class MyhealthPlan extends BaseCommand {
  public userData: UserProvider;
  public planDate: string;

  public path = __dirname.replace(process.cwd(), '.') + '/MyhealthPlan.ts';
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
