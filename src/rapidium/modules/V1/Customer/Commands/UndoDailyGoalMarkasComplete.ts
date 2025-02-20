import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class UndoDailyGoalMarkasComplete
 */
export class UndoDailyGoalMarkasComplete extends BaseCommand {
  public id: string;
  // eslint-disable-next-line
  public path = __dirname.replace(process.cwd(), '.') + '/UndoDailyGoalMarkasComplete.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.params.id ? data.params.id : '';
  }
}
