import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateRootCause
 */
export class CreateRootCause extends BaseCommand {
    public client_id: string;
    public rootcause: Array<string>;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateRootCause.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.client_id ? data.client_id : '';
        this.rootcause = data.rootcause ? data.rootcause : [];
    }
}
