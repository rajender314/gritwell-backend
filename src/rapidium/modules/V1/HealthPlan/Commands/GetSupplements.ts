import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for GetSupplements
 */
export class GetSupplements extends BaseCommand {
  public client_id: string;
  public health_plan_id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetSupplements.ts';
  /**
    * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.client_id = data.client_id ? data.client_id : '';
    this.health_plan_id = data.health_plan_id ? data.health_plan_id : '';
  }
}
