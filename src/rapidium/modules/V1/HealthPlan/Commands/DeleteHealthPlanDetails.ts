import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for DeleteHealthPlanDetails
 */
export class DeleteHealthPlanDetails extends BaseCommand {
    public type: string;
    public id: string;

    public path = __dirname.replace(process.cwd(), '.') + '/DeleteHealthPlanDetails.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.type = data.params.type ? data.params.type : '';
        this.id = data.params.type ? data.params.id : '';
    }
}
