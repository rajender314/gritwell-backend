import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
/**
 * class CurrentAppointment
 */
export class CurrentAppointment extends BaseCommand {
    public client_id: string;
    public userData: UserProvider;
    public path =
        __dirname.replace(process.cwd(), ".") + "/CurrentAppointment.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.userData = data.decoded ? data.decoded : {};
    }
}
