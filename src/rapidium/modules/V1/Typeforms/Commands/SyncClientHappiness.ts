import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
let environment = process.env;
const typeFormClientHappiness: string = environment.TYPE_FORM_CLIENT_HAPPINESS || '';
/**
 * class SyncClientHappiness
 */
export class SyncClientHappiness extends BaseCommand {
    public userProfileFields: any;
    public response: any;
    public type_form_id: string;
    public path = __dirname.replace(process.cwd(), '.') + '/SyncClientHappiness.ts';
    /**
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.response = data.body;
        this.type_form_id = typeFormClientHappiness;
        this.userProfileFields = {};
    }
}
