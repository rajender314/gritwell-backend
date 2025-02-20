import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * class ClientDocument
 */
export class ClientDocument extends BaseCommand {
    public client_id: string;
    public form_response_id: string;
    public type_form_id: string; 
    public path = __dirname.replace(process.cwd(), '.') + '/ClientDocument.ts';
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.form_response_id = data.params.form_response_id ? data.params.form_response_id : '';
        this.type_form_id = data.params.type_form_id ? data.params.type_form_id : ''; 
    }
}
