import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class GetClientAppointmentNotes
 */
export class GetClientAppointmentNotes extends BaseCommand {
    public client_id: string;
    public appointment_id: string;
    public path =
        __dirname.replace(process.cwd(), ".") + "/GetClientAppointmentNotes.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : "";
        this.appointment_id = data.params.appointment_id ? data.params.appointment_id : "";
    }
}
