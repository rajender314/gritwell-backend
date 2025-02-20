import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ValidateHealthPlan
*/
export class ValidateHealthPlan {
    public id: string;
    constructor(id) {
        this.id = id;
    }
    async validate() {
        const activeHealthPlan = await ClientHealthPlanSchema.findOne(
            { _id: ObjectId(this.id), is_active: true, is_submitted: false }
        );
        if (!activeHealthPlan) {
            throw new ResourceNotFound('Not an active health plan', '');
        }
    }
}