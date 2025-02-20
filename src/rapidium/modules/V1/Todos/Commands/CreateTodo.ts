import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * class CreateTodo
 */
export class CreateTodo extends BaseCommand {
    public client_id: string;
    public action: string;
    public path = __dirname.replace(process.cwd(), '.') + '/CreateTodo.ts';
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.body.client_id ? data.body.client_id : '';
        this.action = data.body.action ? data.body.action : '';
    }
}
