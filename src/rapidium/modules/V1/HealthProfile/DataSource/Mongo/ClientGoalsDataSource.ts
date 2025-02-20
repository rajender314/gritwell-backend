import { GetClientGoals }
    from '@basePath/HealthProfile/Commands/GetClientGoals';
import { CreateClientGoals }
    from '@basePath/HealthProfile/Commands/CreateClientGoals';
import { ClientGoalsSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientGoalsSchema';
import { GoalSchema }
    from
    '@basePath/Admin/DataSource/Models/Schema/Hypothesis/GoalSchema';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientGoalsDataSource
*/
export default class ClientGoalsDataSource {

    /**
     * @param {data} data GetClientGoals
     * @return {Object}
     */
    async get(data: GetClientGoals) {
        const goals = await ClientGoalsSchema.find(
            {
                client_id: ObjectId(data.client_id)
            },
            {
                goal_id: 1
            }
        );
        const goalsData: any = [];
        if (goals.length) {
            goals.map(goal => {
                goalsData.push(goal.goal_id);
            });
        }
        return { goals: goalsData  };
    }

    /**
     * @param {data} data CreateClientGoals
     * @return {Object}
     */
    async create(data: CreateClientGoals) {
        await new ValidateClient(data.client_id).validate();
        if (data.goals.length) {
            const goalsPayload = data.goals.map((s) => ObjectId(s));
            const goals = await GoalSchema.find({ '_id': { $in: goalsPayload } });
            const dbGoals = goals.map((goal) => String(goal._id));
            let difference = data.goals.filter(x => !dbGoals.includes(x));
            if (difference.length) {
                throw new ResourceNotFound('Not a valid data for goals', '');
            }
            await ClientGoalsSchema.deleteMany({ client_id: ObjectId(data.client_id) });
            const goalsInsertData: any = [];
            if (data.goals) {
                data.goals.map(rootcause => {
                    goalsInsertData.push({
                        client_id: ObjectId(data.client_id),
                        goal_id: rootcause,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    });
                });
            }
            ClientGoalsSchema.create(goalsInsertData);
            return 'Goal changes have been updated sucessfully';
        } else {
            throw new ResourceNotFound('Please send goals data', '');
        }
    }
}
