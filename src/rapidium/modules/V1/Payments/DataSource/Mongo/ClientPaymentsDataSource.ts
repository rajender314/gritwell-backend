import { ClientPayments }
    from '@basePath/Payments/Commands/ClientPayments';
import { GetPayment }
    from '@basePath/Payments/Commands/GetPayment';
import { CustomerSubscriptionHistorySchema } from '@basePath/Subscriptions/DataSource/Models/Schema/CustomerSubscriptionHistory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientPaymentsDataSource
*/
export default class ClientPaymentsDataSource {
    /**
     * @param {data} data ClientPayments
     * @return {Object}
     */
    async get(data: ClientPayments) {
        try {
            const skip = (data.page - 1) * data.perPage;
            const limit = data.perPage;
            return await CustomerSubscriptionHistorySchema.aggregate([
                {
                    $match: {
                        "user_id": ObjectId(data.client_id)
                    }
                },
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
                                    date: '$created_date',
                                    amount: 1,
                                    plan_duration: 1,
                                    status: {
                                        value: '$payment_statuses._id',
                                        label: '$payment_statuses.name',
                                        code: '$payment_statuses.code',
                                        color: '$payment_statuses.color'
                                    }
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
            ]).then((paymentData: any) => {
                const payments = paymentData[0].paginated_results;
                console.log(payments);
                const paymentsCount: number =
                    paymentData[0].total_count &&
                        paymentData[0].total_count[0] &&
                        paymentData[0].total_count[0].count ?
                        paymentData[0].total_count[0].count :
                        0;
                return { result: payments, count: paymentsCount };
            });

        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    async view(data: GetPayment) {
        return await CustomerSubscriptionHistorySchema.aggregate([
            {
                $addFields: {
                    "type": "$transaction_type",
                    "date": "$created_date"
                }
            },
            {
                $match: {
                    "_id": ObjectId(data.id)
                }
            },
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
                    from: 'customer_cards',
                    let: { stripeCardId: '$stripe_card_id', userId: '$user_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$stripe_card_id", "$$stripeCardId"] },
                                        { $eq: ["$user_id", "$$userId"] }
                                    ]
                                }
                            }
                        },
                        { $project: { card_brand: 1, card_number: 1 } }
                    ],
                    as: 'customer_card',
                },
            },
            {
                $unwind: {
                    path: '$customer_card',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    id: 1,
                    item: '$subscription_plans_info.plan_type',
                    date: 1,
                    amount: 1,
                    total: '$amount',
                    order_id: 1,
                    type: 1,
                    plan_duration: 1,
                    card_no: { $concat: ['$customer_card.card_brand', " ", '$customer_card.card_number'] },
                    client: { $concat: ['$customer_data.first_name', " ", '$customer_data.last_name'] },
                },
            }
        ]).then(payment => {
            if (payment && payment[0]) {
                return payment[0];
            } else {
                throw new ResourceNotFound('No Payment Found', '');
            }
        });
    }
}
