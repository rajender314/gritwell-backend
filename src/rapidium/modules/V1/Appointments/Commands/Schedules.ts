import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
import moment from 'moment-timezone';
/**
 * class Schedules
 */
export class Schedules extends BaseCommand {
    public month: number;
    public year: number;
    public type: string;
    public search: string;
    public page: number;
    public perPage: number;
    public sort: string;
    public column: string;
    public status: string;
    public date: string;
    public userData: UserProvider;
    public path =
        __dirname.replace(process.cwd(), ".") + "/Schedules.ts";
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.month = data.query.month ? parseInt(data.query.month) : parseInt(moment(new Date()).tz('GMT').format("M")) - 1;
        this.year = data.query.year ? parseInt(data.query.year) : parseInt(moment(new Date()).tz('GMT').format("Y"));
        this.type = data.query.type ? data.query.type : 'upcoming';
        this.search = data.query.search ? data.query.search : '';
        this.page = data.query.page ? parseInt(data.query.page) : 1;
        this.perPage = data.query.perPage ? parseInt(data.query.perPage) : 20;
        this.sort = data.query.sort ? data.query.sort : 'DESC';
        this.column = data.query.column ? data.query.column : 'start_date';
        this.status = data.query.status ? data.query.status : '';
        this.date = data.query.status ? data.query.date : '';
        this.userData = data.decoded ? data.decoded : {};
    }
}
