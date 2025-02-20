import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class CreateClientAppointmentNotes
 */
export class CreateClientAppointmentNotes extends BaseCommand {
    public client_id: string;
    public appointment_id: string;
    public payload: any;
    public path =
        __dirname.replace(process.cwd(), ".") + "/CreateClientAppointmentNotes.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.body.client_id ? data.body.client_id : "";
        this.appointment_id = data.body.appointment_id ? data.body.appointment_id : "";
        this.payload = data.body.payload ? data.body.payload : [];
    }
}
