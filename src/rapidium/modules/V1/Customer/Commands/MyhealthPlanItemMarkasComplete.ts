
import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class MyhealthPlanItemMarkasComplete
 */
export class MyhealthPlanItemMarkasComplete extends BaseCommand {
  public userData: UserProvider;
  public completedDate: string;
  public healthPlanItemId: string;
  public healthPlanItemType: string;
  // eslint-disable-next-line
  public path = __dirname.replace(process.cwd(), '.') + '/MyhealthPlanItemMarkasComplete.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.userData = data.decoded ? data.decoded : {};
    this.completedDate =
      data.body.completedDate ? data.body.completedDate : '';
    this.healthPlanItemId =
      data.body.healthPlanItemId ? data.body.healthPlanItemId : '';
    this.healthPlanItemType =
      data.body.healthPlanItemType ? data.body.healthPlanItemType : '';
  }
}
