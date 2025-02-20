import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class AdminPayments
 */
export class AdminPayments extends BaseCommand {
    public search: string;
    public page: number;
    public perPage: number;
    public sort: string;
    public column: string;
    public status: string;
    public item: string;
    public path =
        __dirname.replace(process.cwd(), ".") + "/AdminPayments.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.search = data.query.search ? data.query.search : '';
        this.page = data.query.page ? parseInt(data.query.page) : 1;
        this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
        this.sort = data.query.sort ? data.query.sort : 'asc';
        this.column = data.query.column ? data.query.column : 'first_name';
        this.status = data.query.status ? data.query.status : '';
        this.item = data.query.item ? data.query.item : '';
    }
}
