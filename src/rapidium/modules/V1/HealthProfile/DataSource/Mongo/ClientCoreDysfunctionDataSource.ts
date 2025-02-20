import { CreateCoreDysfunction }
    from '@basePath/HealthProfile/Commands/CreateCoreDysfunction';
import { ClientCoreDysfunctionSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientCoreDysfunctionSchema';
import { CoreDysfunctionSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/CoreDysfunctionSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientCoreDysfunctionDataSource
*/
export default class ClientCoreDysfunctionDataSource {
    /**
     * @param {data} data CreateCoreDysfunction
     * @return {Object}
     */
    async create(data: CreateCoreDysfunction) {
        if (data.imbalance.length) {
            const imbalance = data.imbalance.map((s) => ObjectId(s));
            const coreDysfunctions = await CoreDysfunctionSchema.find({ '_id': { $in: imbalance } });
            const dbCoredysfunctions = coreDysfunctions.map((coreDysfunction) => String(coreDysfunction._id));
            let difference = data.imbalance.filter(x => !dbCoredysfunctions.includes(x));
            if (difference.length) {
                throw new ResourceNotFound('Not a valid data for imbalance', '');
            }
            await ClientCoreDysfunctionSchema.deleteMany({ client_id: ObjectId(data.client_id) });
            const coreDysfunctionInsertData: any = [];
            if (data.imbalance) {
                data.imbalance.map(coreDysfunction => {
                    coreDysfunctionInsertData.push({
                        client_id: ObjectId(data.client_id),
                        coredysfunction_id: coreDysfunction,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    });
                });
            }
            return ClientCoreDysfunctionSchema.create(coreDysfunctionInsertData);
        } else {
            throw new ResourceNotFound('Please send imbalance data', '');
        }
    }
}
