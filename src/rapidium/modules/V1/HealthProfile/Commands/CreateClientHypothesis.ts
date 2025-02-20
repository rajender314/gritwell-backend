import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateClientHypothesis
 */
export class CreateClientHypothesis extends BaseCommand {
    public client_id: string;
    public imbalance: Array<string>;
    public rootcause: Array<string>;
    public diagnosis: Array<string>;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateClientHypothesis.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.body.client_id ? data.body.client_id : '';
        this.imbalance = data.body.imbalance ? data.body.imbalance : [];
        this.rootcause = data.body.rootcause ? data.body.rootcause : [];
        this.diagnosis = data.body.diagnosis ? data.body.diagnosis : [];
    }
}
