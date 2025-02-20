import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class MyhealthPlanItemasViewedCommand
 */
export class MyhealthPlanItemasViewedCommand extends BaseCommand {
  public userData: UserProvider;

  public healthPlanItemId: string;
  public healthPlanId: string;
  // eslint-disable-next-line
  public path = __dirname.replace(process.cwd(), '.') + '/MyhealthPlanItemasViewedCommand.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};

    this.healthPlanItemId =
      data.body.healthPlanItemId ? data.body.healthPlanItemId : '';
    this.healthPlanId =
      data.body.healthPlanId ? data.body.healthPlanId : '';
  }
}
