import { GetClientDetails }
    from '@basePath/OfficeClients/Commands/GetClientDetails';
import { ClientGoalsSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientGoalsSchema';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

export default class ClientGoals {
    async get(data: GetClientDetails) { 
        return await ClientGoalsSchema.aggregate([
            { $match: { client_id: ObjectId(data.id) } },
            {
                $lookup: {
                    from: 'goals',
                    localField: 'goal_id',
                    foreignField: '_id',
                    as: 'goals_data',
                },
            },
            {
                $unwind: {
                    path: '$goals_data',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    value: '$goals_data._id',
                    label: '$goals_data.name'
                }
            }
        ]);
    }
}