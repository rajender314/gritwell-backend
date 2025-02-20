import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for GetClientNotes
 */
export class GetClientNotes extends BaseCommand {
    public client_id: string;
    public type: string;

    public path = __dirname.replace(process.cwd(), '.') + '/GetClientNotes.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.type = data.params.type ? data.params.type : '';
    }
}
