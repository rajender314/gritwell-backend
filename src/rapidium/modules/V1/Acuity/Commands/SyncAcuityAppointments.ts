import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class SyncAcuityAppointments
 */
export class SyncAcuityAppointments extends BaseCommand {
  public resonse;
  public path =
    __dirname.replace(process.cwd(), '.') + '/SyncAcuityAppointments.ts';
  /**
     * @param {data} data
     */
  constructor(data: any) {
    super(data);

    this.resonse = data.body ? data.body : {};
  }
}
