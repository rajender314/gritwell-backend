import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';

/**
 * class AppointmentServey
 */
export class AppointmentServey extends BaseCommand {
    public userProfileFields: any;
    public response: any;
    public path = __dirname.replace(process.cwd(), '.') + '/AppointmentServey.ts';
    /**
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.response = data.body;
        this.userProfileFields = {};
    }
}
