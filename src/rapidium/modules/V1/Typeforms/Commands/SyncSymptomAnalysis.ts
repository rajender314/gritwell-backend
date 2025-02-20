import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
let environment = process.env;
const typeFormMsq: string = environment.TYPE_FORM_SYMPTOM_ANALYSIS || '';
const userProfileFields = {
    ethnicity: environment.MSQ_ETHNICITY,
    address: environment.MSQ_ADDRESS,
    height: environment.MSQ_HEIGHT,
    weight: environment.MSQ_WEIGHT,
    dob: environment.MSQ_DOB,
    state: environment.MSQ_STATE
}

/**
 * class SyncSymptomAnalysis
 */
export class SyncSymptomAnalysis extends BaseCommand {
    public userProfileFields: any;
    public response: any;
    public type_form_id: string;
    public path = __dirname.replace(process.cwd(), '.') + '/SyncSymptomAnalysis.ts';
    /**
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.userProfileFields = userProfileFields;
        this.response = data.body;
        this.type_form_id = typeFormMsq;
    }
}
