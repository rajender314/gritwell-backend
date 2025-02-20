import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * class ClientRecentActivities
 */
export class ClientRecentActivities extends BaseCommand {
    public client_id: string;
    public path = __dirname.replace(process.cwd(), '.') + '/ClientRecentActivities.ts';
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.id ? data.params.id : '';
    }
}
