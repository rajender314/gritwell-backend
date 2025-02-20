import { DeleteHealthPlanDetails }
    from '@basePath/HealthPlan/Commands/DeleteHealthPlanDetails';
import { ClientPhasesOfCareSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientPhasesOfCareSchema';
import { ClientNutritionSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientNutritionSchema';
import { ClientTestsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientTestsSchema';
import { ClientSupplementsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientSupplementsSchema';
import { ClientLifeStyleSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientLifeStyleSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class DeleteHealthPlanDetailsDataSource
*/
export default class DeleteHealthPlanDetailsDataSource {
    /**
     * @param {data} data SubmitHealthPlan
     * @return {Object}
     */
    async delete(data: DeleteHealthPlanDetails) {
        if (data.type === 'phasesOfCare') {
            return await ClientPhasesOfCareSchema.findOneAndDelete(
                {
                    _id: ObjectId(data.id)
                },
                {
                    __user: { last_modified_by: ObjectId(data.last_modified_by) },
                }
            )
        }
        if (data.type === 'nutrition') {
            return await ClientNutritionSchema.findOneAndDelete(
                {
                    _id: ObjectId(data.id)
                },
                {
                    __user: { last_modified_by: ObjectId(data.last_modified_by) },
                }
            )
        }
        if (data.type === 'testing') {
            return await ClientTestsSchema.findOneAndDelete(
                {
                    _id: ObjectId(data.id)
                },
                {
                    __user: { last_modified_by: ObjectId(data.last_modified_by) },
                }
            )
        }
        if (data.type === 'supplement') {
            return await ClientSupplementsSchema.findOneAndDelete(
                {
                    _id: ObjectId(data.id)
                },
                {
                    __user: { last_modified_by: ObjectId(data.last_modified_by) },
                }
            )
        }
        if (data.type === 'lifestyle') {
            return await ClientLifeStyleSchema.findOneAndDelete(
                {
                    _id: ObjectId(data.id)
                },
                {
                    __user: { last_modified_by: ObjectId(data.last_modified_by) },
                }
            )
        }
    }
}
