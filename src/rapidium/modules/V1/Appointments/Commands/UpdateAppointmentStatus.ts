import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class UpdateAppointmentStatus
 */
export class UpdateAppointmentStatus extends BaseCommand {
    public path =
        __dirname.replace(process.cwd(), ".") + "/UpdateAppointmentStatus.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data); 
    }
}
