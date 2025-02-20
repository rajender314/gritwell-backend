import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateClientGoals
 */
export class CreateClientGoals extends BaseCommand {
    public client_id: string;
    public goals: Array<string>;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateClientGoals.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.body.client_id ? data.body.client_id : '';
        this.goals = data.body.goals ? data.body.goals : [];
    }
}
