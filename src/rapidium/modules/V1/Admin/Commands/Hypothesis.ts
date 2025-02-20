import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * class Hypothesis
 */
export class Hypothesis extends BaseCommand {
    public search: string;
    public page: number;
    public perPage: number;
    public sort: string;
    public column: string;
    public status: Boolean;
    public schema: any;
    public collectionName: string;

    public path = __dirname.replace(process.cwd(), '.') + '/Hypothesis.ts';
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.search = data.query.search ? data.query.search : '';
        this.page = data.query.page ? parseInt(data.query.page) : 1;
        this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
        this.sort = data.query.sort ? data.query.sort : 'DESC';
        this.column = data.query.column ? data.query.column : 'created_date';
        this.status = data.query.status ? data.query.status : true;
        this.schema = data.schema;
        this.collectionName = data.collectionName;
    }
}
