import { GetTests }
    from '@basePath/HealthPlan/Commands/GetTests';
import { CreateTests }
    from '@basePath/HealthPlan/Commands/CreateTests';
import { ClientTestsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientTestsSchema';
import { FrequencySchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/FrequencySchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class TestDataSource
*/
export default class TestDataSource {
    /**
     * @param {data} data GetTests
     * @return {Object}
     */
    async get(data: GetTests) {
        const tests = await ClientTestsSchema.aggregate([
            { $match: { client_id: ObjectId(data.client_id), health_plan_id: ObjectId(data.health_plan_id) } },
            {
                $lookup: {
                    from: 'tests',
                    localField: 'test_id',
                    foreignField: '_id',
                    as: 'test_data',
                },
            },
            {
                $unwind: {
                    path: '$test_data', preserveNullAndEmptyArrays: true,
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
            { $sort: { 'customer_statuses.code': 1, 'test_data.name': 1 } },
            {
                $project: {
                    id: 1,
                    description: 1,
                    test_id: 1,
                    status: 1,
                    statusInfo: {
                        value: '$customer_statuses._id',
                        label: '$customer_statuses.name',
                        code: '$customer_statuses.code',
                        color: '$customer_statuses.color'
                    },
                    name: '$test_data.name',
                    brand: '$test_data.brand',
                    price: '$test_data.price',
                    link: '$test_data.link',
                },
            },
        ]);
        const count = tests.length;
        return { tests, count };
    }

    async create(data: CreateTests) {
        try {
            if (data.payload.items) {
                await this.createOrUpdatePhases(data.payload.items, async (tests) => {
                    if (tests._id) {
                        await ClientTestsSchema
                            .findByIdAndUpdate(
                                tests._id,
                                {
                                    description: tests.description,
                                    status: tests.status,
                                    last_modified_by: data.last_modified_by,
                                    last_modified_date: data.last_modified_date
                                },
                                { new: true }
                            )
                    }
                    else {
                        const frequency = await FrequencySchema.findOne({ period: "one_time" });
                        const checkTest = await ClientTestsSchema.countDocuments({ client_id: data.client_id, health_plan_id: data.health_plan_id, test_id: tests.test_id });
                        if (frequency != null && checkTest == 0) {
                            await ClientTestsSchema.create({
                                client_id: data.client_id,
                                health_plan_id: data.health_plan_id,
                                test_id: tests.test_id,
                                description: tests.description,
                                frequency_id: frequency._id,
                                status: tests.status,
                                created_by: data.created_by,
                                created_date: data.created_date,
                                last_modified_by: data.last_modified_by,
                                last_modified_date: data.last_modified_date
                            });
                        } else {
                            throw new ResourceNotFound(`Test with ID: ${tests.test_id} is already created`, '');
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
