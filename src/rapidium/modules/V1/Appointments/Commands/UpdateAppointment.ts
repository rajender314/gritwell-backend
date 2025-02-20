import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class UpdateAppointment
 */
export class UpdateAppointment extends BaseCommand {
    public id: string;
    public status: string;
    public from: string;
    public path =
        __dirname.replace(process.cwd(), ".") + "/UpdateAppointment.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.id = data.params.id ? data.params.id : "";
        this.status = data.body.status ? data.body.status : "";
        this.from = data.body.from ? data.body.from : "appointments";
    }
}
