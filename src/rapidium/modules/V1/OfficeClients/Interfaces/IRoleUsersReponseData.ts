import {IRoleUsers} from '@basePath/OfficeClients/Interfaces/IRoleUsers';

export interface IRoleUsersReponseData {
    paginated_results: Array<IRoleUsers>;
    total_count: number
}
