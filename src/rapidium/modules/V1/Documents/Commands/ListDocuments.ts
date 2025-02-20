import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * class ListDocuments
 */
export class ListDocuments extends BaseCommand {
    public client_id: string;
    public path = __dirname.replace(process.cwd(), '.') + '/ListDocuments.ts';
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
    }
}
