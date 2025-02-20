import { GetSupplements }
    from '@basePath/HealthPlan/Commands/GetSupplements';
import { CreateSupplements }
    from '@basePath/HealthPlan/Commands/CreateSupplements';
import { ClientSupplementsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientSupplementsSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class SupplementDataSource
*/
export default class SupplementDataSource {
    /**
     * @param {data} data GetSupplements
     * @return {Object}
     */
    async get(data: GetSupplements) {
        const supplements = await ClientSupplementsSchema.aggregate([
            { $match: { client_id: ObjectId(data.client_id), health_plan_id: ObjectId(data.health_plan_id) } },
            {
                $lookup: {
                    from: 'supplements',
                    localField: 'supplement_id',
                    foreignField: '_id',
                    as: 'supplement_data',
                },
            },
            {
                $unwind: {
                    path: '$supplement_data', preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'customer_statuses',
                    localField: 'status',
                    foreignField: '_id',
                    as: 'customer_statuses',
                },
            },
            { $sort: { 'customer_statuses.code': 1, 'supplement_data.name': 1 } },
            {
                $project: {
                    id: 1,
                    description: 1,
                    supplement_id: 1,
                    status: 1,
                    statusInfo: {
                        value: '$customer_statuses._id',
                        label: '$customer_statuses.name',
                        code: '$customer_statuses.code',
                        color: '$customer_statuses.color'
                    },
                    unit_id: 1,
                    quantity: 1,
                    duration: 1,
                    name: '$supplement_data.name',
                    brand: '$supplement_data.brand',
                    price: '$supplement_data.price',
                    link: '$supplement_data.link',
                },
            },
        ]);
        const count = supplements.length;
        return { supplements, count };
    }

    async create(data: CreateSupplements) {
        try {
            if (data.payload.items) {
                await this.createOrUpdatePhases(data.payload.items, async (supplements) => {
                    if (supplements._id) {
                        await ClientSupplementsSchema
                            .findByIdAndUpdate(
                                supplements._id,
                                {
                                    description: supplements.description,
                                    status: supplements.status,
                                    last_modified_by: data.last_modified_by,
                                    last_modified_date: data.last_modified_date
                                }
                            )
                    }
                    else {
                        const checkSupplement = await ClientSupplementsSchema.countDocuments({ client_id: data.client_id, health_plan_id: data.health_plan_id, supplement_id: supplements.supplement_id });
                        if (checkSupplement == 0) {
                            await ClientSupplementsSchema.create({
                                client_id: data.client_id,
                                health_plan_id: data.health_plan_id,
                                supplement_id: supplements.supplement_id,
                                description: supplements.description,
                                quantity: supplements.quantity,
                                unit_id: supplements.unit_id,
                                duration: supplements.duration,
                                status: supplements.status,
                                created_by: data.created_by,
                                created_date: data.created_date,
                                last_modified_by: data.last_modified_by,
                                last_modified_date: data.last_modified_date
                            });
                        } else {
                            throw new ResourceNotFound(`Supplement with ID: ${supplements.supplement_id} is already created`, '');
                        }
                    }
                });
            }
            return true;
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    createOrUpdatePhases = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };
}
