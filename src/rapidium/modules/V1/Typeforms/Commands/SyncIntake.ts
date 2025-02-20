import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
let environment = process.env;
const typeFormIntake: string = environment.TYPE_FORM_INTAKE || '';
const userProfileFields = {
    gender: environment.I_GENDER
}
/**
 * class SyncIntake
 */
export class SyncIntake extends BaseCommand {
    public userProfileFields: any;
    public response: any;
    public type_form_id: string;
    public path = __dirname.replace(process.cwd(), '.') + '/SyncIntake.ts';
    /**
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.userProfileFields = userProfileFields;
        this.response = data.body;
        this.type_form_id = typeFormIntake;
    }
}
