import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class GetPayment
 */
export class GetPayment extends BaseCommand {
    public id: string;
    public path =
        __dirname.replace(process.cwd(), ".") + "/GetPayment.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.id = data.params.payment_id ? data.params.payment_id : '';
    }
}
