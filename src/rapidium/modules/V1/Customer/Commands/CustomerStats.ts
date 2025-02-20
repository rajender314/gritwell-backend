import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class CustomerStats
 */
export class CustomerStats extends BaseCommand {
  public userId: string;
  public appointmentStats: boolean;
  public subscriptionStats: boolean;
  public phasesOfCareStats: boolean;

  public path =
    __dirname.replace(process.cwd(), '.') + '/CustomerStats.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userId = data.params.userId ? data.params.userId : {};
    this.appointmentStats =
      data.params.appointmentStats ? data.params.appointmentStats : false;
    this.subscriptionStats =
      data.params.subscriptionStats ? data.params.subscriptionStats : false;
    this.phasesOfCareStats =
      data.params.phasesOfCareStats ? data.params.phasesOfCareStats : false;
  }
}
