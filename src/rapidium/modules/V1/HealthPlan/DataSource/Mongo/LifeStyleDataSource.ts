import { GetLifeStyle }
    from '@basePath/HealthPlan/Commands/GetLifeStyle';
import { CreateLifeStyle }
    from '@basePath/HealthPlan/Commands/CreateLifeStyle';
import { ClientLifeStyleSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientLifeStyleSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class NutritionDataSource
*/
export default class NutritionDataSource {
    /**
     * @param {data} data GetLifeStyle
     * @return {Object}
     */
    async get(data: GetLifeStyle) {
        const lifestyle = await ClientLifeStyleSchema.aggregate([
            { $match: { client_id: ObjectId(data.client_id), health_plan_id: ObjectId(data.health_plan_id) } },
            {
                $lookup: {
                    from: 'life_styles',
                    localField: 'lifestyle_id',
                    foreignField: '_id',
                    as: 'lifestyle_data',
                },
            },
            {
                $unwind: {
                    path: '$lifestyle_data', preserveNullAndEmptyArrays: true,
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
            {
                $unwind: {
                    path: '$customer_statuses', preserveNullAndEmptyArrays: true,
                },
            },
            { $sort: { 'customer_statuses.code': 1, 'lifestyle_data.name': 1 } },
            {
                $project: {
                    id: 1,
                    lifestyle_id: 1,
                    description: 1,
                    status: 1,
                    statusInfo: {
                        value: '$customer_statuses._id',
                        label: '$customer_statuses.name',
                        code: '$customer_statuses.code',
                        color: '$customer_statuses.color'
                    },
                    name: '$lifestyle_data.name'
                },
            },
        ]);
        const count = lifestyle.length;
        return { lifestyle, count };
    }
    /**
     * @param {data} data CreateLifeStyle
     * @return {Object}
     */
    async create(data: CreateLifeStyle) {
        try {
            if (data.payload.items) {
                await this.createOrUpdatePhases(data.payload.items, async (lifestyle) => {
                    if (lifestyle._id) {
                        await ClientLifeStyleSchema
                            .findByIdAndUpdate(
                                lifestyle._id,
                                {
                                    description: lifestyle.description,
                                    status: lifestyle.status,
                                    last_modified_by: data.last_modified_by,
                                    last_modified_date: data.last_modified_date
                                }
                            )
                    }
                    else {
                        const checkLifeStyle = await ClientLifeStyleSchema.countDocuments({ client_id: data.client_id, health_plan_id: data.health_plan_id, lifestyle_id: lifestyle.lifestyle_id });
                        if (checkLifeStyle == 0) {
                            await ClientLifeStyleSchema.create({
                                client_id: data.client_id,
                                health_plan_id: data.health_plan_id,
                                lifestyle_id: lifestyle.lifestyle_id,
                                description: lifestyle.description,
                                frequency_id: lifestyle.frequency_id,
                                status: lifestyle.status,
                                created_by: data.created_by,
                                created_date: data.created_date,
                                last_modified_by: data.last_modified_by,
                                last_modified_date: data.last_modified_date
                            });
                        } else {
                            throw new ResourceNotFound(`Lifestyle with ID: ${lifestyle.lifestyle_id} is already created`, '');
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
