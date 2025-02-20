import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreatePhasesOfCare
 */
export class CreatePhasesOfCare extends BaseCommand {
    public client_id: string;
    public health_plan_id: string;
    public payload: any;

    public path = __dirname.replace(process.cwd(), '.') + '/CreatePhasesOfCare.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.client_id ? data.client_id : '';
        this.health_plan_id = data.health_plan_id ? data.health_plan_id : '';
        this.payload = data.payload ? data.payload : [];
    }
}
