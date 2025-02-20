import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand"; 
/**
 * class ClientPayments
 */
export class ClientPayments extends BaseCommand {
    public client_id: string;
    public search: string;
    public page: number;
    public perPage: number;
    public sort: string;
    public column: string;
    public path =
        __dirname.replace(process.cwd(), ".") + "/ClientPayments.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.params.client_id ? data.params.client_id : '';
        this.search = data.query.search ? data.query.search : '';
        this.page = data.query.page ? parseInt(data.query.page) : 1;
        this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
        this.sort = data.query.sort ? data.query.sort : 'asc';
        this.column = data.query.column ? data.query.column : 'first_name';
    }
}
