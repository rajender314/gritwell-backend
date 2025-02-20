import { GetPhasesOfCare }
    from '@basePath/HealthPlan/Commands/GetPhasesOfCare';
import { CreatePhasesOfCare }
    from '@basePath/HealthPlan/Commands/CreatePhasesOfCare';
import { ClientPhasesOfCareSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientPhasesOfCareSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class PhasesOfCareDataSource
*/
export default class PhasesOfCareDataSource {
    /**
     * @param {data} data GetPhasesOfCare
     * @return {Object}
     */
    async get(data: GetPhasesOfCare) {
        const phasesOfCare = await ClientPhasesOfCareSchema.find(
            {
                "client_id": ObjectId(data.client_id),
                "health_plan_id": ObjectId(data.health_plan_id)
            },
            {
                name: 1,
                description: 1,
                status: 1
            }
        );
        const totalCount = phasesOfCare.length;
        return { result: phasesOfCare, count: totalCount };
    }


    async create(data: CreatePhasesOfCare) {
        try {
            if (data.payload.phases) {
                await this.createOrUpdatePhases(data.payload.phases, async (phases) => {
                    if (phases._id) {
                        await ClientPhasesOfCareSchema
                            .findByIdAndUpdate(phases._id,
                                {
                                    name: phases.name,
                                    description: phases.description,
                                    status: phases.status,
                                    last_modified_by: data.last_modified_by,
                                    last_modified_date: data.last_modified_date
                                },
                                { new: true }
                            )
                    }
                    else {
                        const checkPhase = await ClientPhasesOfCareSchema.findOne({ client_id: data.client_id, health_plan_id: data.health_plan_id, name: phases.name });
                        if (checkPhase == null) {
                            await ClientPhasesOfCareSchema.create({
                                client_id: data.client_id,
                                health_plan_id: data.health_plan_id,
                                name: phases.name,
                                description: phases.description,
                                status: phases.status,
                                created_by: data.created_by,
                                created_date: data.created_date,
                                last_modified_by: data.last_modified_by,
                                last_modified_date: data.last_modified_date
                            });
                        } else {
                            throw new ResourceNotFound(`${phases.name} is already created`, '');
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
