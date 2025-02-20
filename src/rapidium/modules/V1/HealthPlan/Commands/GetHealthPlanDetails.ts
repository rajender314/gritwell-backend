import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for GetHealthPlanDetails
 */
export class GetHealthPlanDetails extends BaseCommand {
    public client_id: string;
    public health_plan_id: string; 

    public path = __dirname.replace(process.cwd(), '.') + '/GetHealthPlanDetails.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.health_plan_id = data.params.health_plan_id ? data.params.health_plan_id : '';
    }
}
