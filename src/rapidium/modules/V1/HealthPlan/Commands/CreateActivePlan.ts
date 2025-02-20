import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command class for CreateActivePlan
 */
export class CreateActivePlan extends BaseCommand {
    public client_id: string; 
    public appointment_type: string; 
    public appointment_id: string; 

    public path = __dirname.replace(process.cwd(), '.') + '/CreateActivePlan.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.body.client_id ? data.body.client_id : ''; 
        this.appointment_type = data.body.appointment_type ? data.body.appointment_type : ''; 
        this.appointment_id = data.body.appointment_id ? data.body.appointment_id : ''; 
    }
}
