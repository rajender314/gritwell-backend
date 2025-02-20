import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for GetClientGoals
 */
export class GetClientGoals extends BaseCommand {
    public client_id: string;

    public path = __dirname.replace(process.cwd(), '.') + '/GetClientGoals.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
    }
}
