import {IClients} from '@basePath/OfficeClients/Interfaces/IClients';

export interface IClientsReponseData {
    paginated_results: Array<IClients>;
    total_count: number
}
