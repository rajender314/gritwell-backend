import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
let environment = process.env;
const typeFormHealthAssessment: string = environment.TYPE_FORM_HEALTH_ASSESSMENT || '';

const userProfileFields = {
    first_name: environment.HA_FIRST_NAME,
    last_name: environment.HA_LAST_NAME,
    email: environment.HA_EMAIL,
    phone: environment.HA_PHONE
}
/**
 * class SyncHealthAssessment
 */
export class SyncHealthAssessment extends BaseCommand {
    public userProfileFields: any;
    public response: any;
    public type_form_id: string;
    public path = __dirname.replace(process.cwd(), '.') + '/SyncHealthAssessment.ts';
    /**
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.userProfileFields = userProfileFields;
        this.response = data.body;
        this.type_form_id = typeFormHealthAssessment;
    }
}
