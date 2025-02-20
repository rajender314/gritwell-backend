import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class DeleteAppointmentNotes
 */
export class DeleteAppointmentNotes extends BaseCommand { 
    public id: string;
    public path =
        __dirname.replace(process.cwd(), ".") + "/DeleteAppointmentNotes.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data); 
        this.id = data.params.appointment_note_id ? data.params.appointment_note_id : "";
    }
}
