import { AdminPayments }
    from '@basePath/Payments/Commands/AdminPayments';
import { CustomerSubscriptionHistorySchema } from '@basePath/Subscriptions/DataSource/Models/Schema/CustomerSubscriptionHistory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
const environment = process.env;
/**
* class AdminPaymentsDataSource
*/
export default class AdminPaymentsDataSource {
    /**
     * @param {data} data AdminPayments
     * @return {Object}
     */
    async get(data: AdminPayments) {
        try {
            const skip = (data.page - 1) * data.perPage;
            const limit = data.perPage;

            const search = data.search.replace(/\s+/g, ' ').trim();
            const searchQry = {};

            if (data.search != '') {
                Object.assign(searchQry, {
                    $or: [
                        {
                            'customer_data.first_name': {
                                $regex: `.*${search}.*`,
                                $options: 'i',
                            },
                        },
                        {
                            'customer_data.last_name': { $regex: `.*${search}.*`, $options: 'i' },
                        },
                        {
                            $expr: {
                                $regexMatch: {
                                    input: {
                                        $concat: [
                                            '$customer_data.first_name',
                                            ' ',
                                            '$customer_data.last_name',
                                        ],
                                    },
                                    regex: search,
                                    options: 'i',
                                },
                            },
                        },
                    ],
                });
            }

            const filterQuery = {};
            if (data.status != '') {
                const statuses = data.status.split(',');
                const statusesArr = statuses.map((s) => ObjectId(s));
                Object.assign(filterQuery, {
                    'payment_status_id': { $in: statusesArr },
                });
            }
            if (data.item != '') {
                const planTypes = data.item.split(',');
                const planTypesArr = planTypes.map((s) => ObjectId(s));
                Object.assign(filterQuery, {
                    'subscription_plan_id': { $in: planTypesArr },
                });
            }

            return await CustomerSubscriptionHistorySchema.aggregate([
                {
                    $lookup: {
                        from: 'subscription_plans',
                        localField: 'subscription_plan_id',
                        foreignField: '_id',
                        as: 'subscription_plans_info',
                    }
                },
                {
                    $unwind: {
                        path: '$subscription_plans_info',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'customer_data',
                    }
                },
                {
                    $unwind: {
                        path: '$customer_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'payment_statuses',
                        localField: 'payment_status_id',
                        foreignField: '_id',
                        as: 'payment_statuses',
                    }
                },
                {
                    $unwind: {
                        path: '$payment_statuses',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                { $match: searchQry },
                { $match: filterQuery },
                {
                    $facet: {
                        paginated_results: [
                            {
                                $skip: skip,
                            },
                            { $limit: limit },
                            {
                                $project: {
                                    id: 1,
                                    plan_name: '$subscription_plans_info.plan_type',
                                    created_date: 1,
                                    amount: 1,
                                    transaction_type: 1,
                                    plan_duration: 1,
                                    status: {
                                        value: '$payment_statuses._id',
                                        label: '$payment_statuses.name',
                                        code: '$payment_statuses.code',
                                        color: '$payment_statuses.color'
                                    },
                                    client_info: {
                                        name: { $concat: ['$customer_data.first_name', " ", '$customer_data.last_name'] },
                                        img_name: '$customer_data.img_unique_name'
                                    },
                                },
                            },
                        ],
                        total_count: [
                            {
                                $count: 'count',
                            },
                        ],
                    },
                }
            ])
                .collation({ locale: 'en', strength: 1 })
                .allowDiskUse(true)
                .then((paymentsData: any) => {
                    let payments = paymentsData[0].paginated_results;
                    const paymentsCount: number =
                        paymentsData[0].total_count &&
                            paymentsData[0].total_count[0] &&
                            paymentsData[0].total_count[0].count ?
                            paymentsData[0].total_count[0].count :
                            0;
                    const adminPayments: any = [];
                    let totalSubsriptions = 0;
                    if (payments.length) {
                        payments.map(payment => {
                            payment.client_info.image = payment.client_info && payment.client_info.img_name ? environment.api_base_url + payment.client_info.img_name : '';
                            const paymentObj: any = {
                                id: payment._id,
                                item: payment.plan_name,
                                date: payment.created_date,
                                amount: payment.amount,
                                client: payment.client_info,
                                status: payment.status
                            }
                            adminPayments.push(paymentObj);
                            totalSubsriptions += Number(payment.amount);
                        });
                    }
                    return { result: adminPayments, count: paymentsCount, totalSubsriptions };
                });
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
}
