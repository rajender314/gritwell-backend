import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateHealthPlan
 */
export class CreateHealthPlan extends BaseCommand {
    public type: string;
    public client_id: string;
    public health_plan_id: string;
    public payload: any;
    public notes: string;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateHealthPlan.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.type = data.params.type ? data.params.type : '';
        this.client_id = data.body.client_id ? data.body.client_id : '';
        this.health_plan_id = data.body.health_plan_id ? data.body.health_plan_id : '';
        this.payload = data.body.payload ? data.body.payload : {};
        this.notes = data.body.notes ? data.body.notes : '';
    }
}
