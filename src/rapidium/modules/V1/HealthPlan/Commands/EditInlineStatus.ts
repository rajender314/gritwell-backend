import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command class for EditInlineStatus
 */
export class EditInlineStatus extends BaseCommand {
    public type: string;
    public health_plan_row_id: string;
    public status: string;
    public userData: UserProvider;

    public path = __dirname.replace(process.cwd(), '.') + '/EditInlineStatus.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.type = data.params.type ? data.params.type : '';
        this.health_plan_row_id = data.params.health_plan_row_id ? data.params.health_plan_row_id : '';
        this.status = data.body.status ? data.body.status : '';
        this.userData = data.decoded ? data.decoded : {};
    }
}
