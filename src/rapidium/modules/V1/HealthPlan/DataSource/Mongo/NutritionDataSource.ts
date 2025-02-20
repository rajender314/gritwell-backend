import { GetNutrition }
    from '@basePath/HealthPlan/Commands/GetNutrition';
import { CreateNutrition }
    from '@basePath/HealthPlan/Commands/CreateNutrition';
import { ClientNutritionSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientNutritionSchema';
import { FrequencySchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/FrequencySchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class NutritionDataSource
*/
export default class NutritionDataSource {
    /**
     * @param {data} data GetNutrition
     * @return {Object}
     */
    async get(data: GetNutrition) {
        const nutritions = await ClientNutritionSchema.aggregate([
            { $match: { client_id: ObjectId(data.client_id), health_plan_id: ObjectId(data.health_plan_id) } },
            {
                $lookup: {
                    from: 'nutritions',
                    localField: 'nutrition_id',
                    foreignField: '_id',
                    as: 'nutrition_data',
                },
            },
            {
                $unwind: {
                    path: '$nutrition_data', preserveNullAndEmptyArrays: true,
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
            { $sort: { 'customer_statuses.code': 1, 'nutrition_data.name': 1 } },
            {
                $project: {
                    id: 1,
                    nutrition_id: 1,
                    type: 1,
                    description: 1,
                    status: 1,
                    statusInfo: {
                        value: '$customer_statuses._id',
                        label: '$customer_statuses.name',
                        code: '$customer_statuses.code',
                        color: '$customer_statuses.color'
                    },
                    name: '$nutrition_data.name'
                },
            },
        ]);
        const count = nutritions.length;
        let increase: any = [];
        let decrease: any = [];
        let avoid: any = [];
        if (nutritions.length) {
            increase = nutritions.filter(nutrition => {
                return nutrition.type === 'increase'
            })
            decrease = nutritions.filter(nutrition => {
                return nutrition.type === 'decrease'
            })
            avoid = nutritions.filter(nutrition => {
                return nutrition.type === 'avoid'
            })
        }
        return { increase, decrease, avoid, count };
    }

    async create(data: CreateNutrition) {
        let nutritionPayload: any = [];
        for (const type in data.payload) {
            if (data.payload[type]) {
                data.payload[type].map(payload => {
                    payload.type = type
                    nutritionPayload.push(payload);
                })
            }
        }
        try {
            if (nutritionPayload) {
                await this.createOrUpdatePhases(nutritionPayload, async (nutrition) => {
                    if (nutrition._id) {
                        await ClientNutritionSchema
                            .findByIdAndUpdate(
                                nutrition._id,
                                {
                                    description: nutrition.description,
                                    status: nutrition.status,
                                    last_modified_by: data.last_modified_by,
                                    last_modified_date: data.last_modified_date
                                }
                            )
                    }
                    else {
                        const frequency = await FrequencySchema.findOne({ period: "daily" });
                        const checkNutrition = await ClientNutritionSchema.countDocuments({ client_id: data.client_id, health_plan_id: data.health_plan_id, nutrition_id: nutrition.nutrition_id, type: nutrition.type });
                        if (frequency != null && checkNutrition == 0) {
                            await ClientNutritionSchema.create({
                                client_id: data.client_id,
                                health_plan_id: data.health_plan_id,
                                nutrition_id: nutrition.nutrition_id,
                                description: nutrition.description,
                                type: nutrition.type,
                                frequency_id: frequency._id,
                                status: nutrition.status,
                                created_by: data.created_by,
                                created_date: data.created_date,
                                last_modified_by: data.last_modified_by,
                                last_modified_date: data.last_modified_date
                            });
                        } else {
                            throw new ResourceNotFound(`Nutrition with ID: ${nutrition.nutrition_id} is already created`, '');
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
