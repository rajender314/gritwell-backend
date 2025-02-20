import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateDiagnosis
 */
export class CreateDiagnosis extends BaseCommand {
    public client_id: string;
    public diagnosis: Array<string>;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateDiagnosis.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.client_id ? data.client_id : '';
        this.diagnosis = data.diagnosis ? data.diagnosis : [];
    }
}
