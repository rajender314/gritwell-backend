import { CreateRootCause }
    from '@basePath/HealthProfile/Commands/CreateRootCause';
import { ClientRootCauseSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientRootCauseSchema';
import { RootCauseSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/RootCauseSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientRootCauseDataSource
*/
export default class ClientRootCauseDataSource {

    /**
     * @param {data} data CreateRootCause
     * @return {Object}
     */
    async create(data: CreateRootCause) {
        if (data.rootcause.length) {
            const rootCausesPayload = data.rootcause.map((s) => ObjectId(s));
            const routeCauses = await RootCauseSchema.find({ '_id': { $in: rootCausesPayload } });
            const dbRouteCauses = routeCauses.map((routeCause) => String(routeCause._id));
            let difference = data.rootcause.filter(x => !dbRouteCauses.includes(x));
            if (difference.length) {
                throw new ResourceNotFound('Not a valid data for root cause', '');
            }
            await ClientRootCauseSchema.deleteMany({ client_id: ObjectId(data.client_id) });
            const rootCauseInsertData: any = [];
            if (data.rootcause) {
                data.rootcause.map(rootcause => {
                    rootCauseInsertData.push({
                        client_id: ObjectId(data.client_id),
                        rootcause_id: rootcause,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    });
                });
            }
            return ClientRootCauseSchema.create(rootCauseInsertData);
        } else {
            throw new ResourceNotFound('Please send root data', '');
        }
    }
}
