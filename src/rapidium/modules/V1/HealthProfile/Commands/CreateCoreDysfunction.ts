import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateCoreDysfunction
 */
export class CreateCoreDysfunction extends BaseCommand {
    public client_id: string;
    public imbalance: Array<string>;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateCoreDysfunction.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.client_id ? data.client_id : '';
        this.imbalance = data.imbalance ? data.imbalance : [];
    }
}
