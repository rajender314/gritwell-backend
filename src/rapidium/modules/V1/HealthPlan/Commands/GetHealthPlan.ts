import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for GetHealthPlan
 */
export class GetHealthPlan extends BaseCommand {
    public client_id: string;
    public health_plan_id: string;
    public type: string;

    public path = __dirname.replace(process.cwd(), '.') + '/GetHealthPlan.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.health_plan_id = data.params.health_plan_id ? data.params.health_plan_id : '';
        this.type = data.params.type ? data.params.type : '';
    }
}
