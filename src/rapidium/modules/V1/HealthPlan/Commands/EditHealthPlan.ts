import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command class for EditHealthPlan
 */
export class EditHealthPlan extends BaseCommand {
    public client_id: string;
    // public health_plan_id: string;
    public userData: UserProvider;

    public path = __dirname.replace(process.cwd(), '.') + '/EditHealthPlan.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        // this.health_plan_id = data.params.health_plan_id ? data.params.health_plan_id : '';
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.userData = data.decoded ? data.decoded : {};
    }
}
