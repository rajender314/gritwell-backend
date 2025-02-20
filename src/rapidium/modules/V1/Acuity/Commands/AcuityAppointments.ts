import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class AcuityAppointments
 */
export class AcuityAppointments extends BaseCommand {
  public id;
  public action;
  public path =
    __dirname.replace(process.cwd(), '.') + '/AcuityAppointments.ts';
  /**
     * @param {data} data
     */
  constructor(data: any) {
    super(data);

    this.id = data.id ? data.id : '';
    this.action = data.action ? data.action : '';
  }
}
