import { GetHealthPlan }
    from '@basePath/HealthPlan/Commands/GetHealthPlan';
import { CreateHealthPlan }
    from '@basePath/HealthPlan/Commands/CreateHealthPlan';
import { GetPhasesOfCare }
    from '@basePath/HealthPlan/Commands/GetPhasesOfCare';
import { CreatePhasesOfCare }
    from '@basePath/HealthPlan/Commands/CreatePhasesOfCare';
import { GetNutrition }
    from '@basePath/HealthPlan/Commands/GetNutrition';
import { CreateNutrition }
    from '@basePath/HealthPlan/Commands/CreateNutrition';
import { GetTests }
    from '@basePath/HealthPlan/Commands/GetTests';
import { CreateTests }
    from '@basePath/HealthPlan/Commands/CreateTests';
import { GetSupplements }
    from '@basePath/HealthPlan/Commands/GetSupplements';
import { CreateSupplements }
    from '@basePath/HealthPlan/Commands/CreateSupplements';
import { GetLifeStyle }
    from '@basePath/HealthPlan/Commands/GetLifeStyle';
import { CreateLifeStyle }
    from '@basePath/HealthPlan/Commands/CreateLifeStyle';
import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { ClientInternalNotes } from
    '@basePath/HealthPlan/DataSource/Mongo/ClientInternalNotes';
import { HealthPlanPreview } from
    '@basePath/HealthPlan/DataSource/Mongo/HealthPlanPreview';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { HealthPlanType } from '@basePath/HealthPlan/Interfaces/IHealthPlan';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { ValidateHealthPlan }
    from
    '@basePath/HealthPlan/DataSource/Mongo/ValidateHealthPlan';
/**
* class PhasesOfCareDataSource
*/
export default class PhasesOfCareDataSource {
    /**
     * @param {data} data GetHealthPlan
     * @return {Object}
     */
    async get(data: GetHealthPlan) {
        await new ValidateClient(data.client_id).validate();
        if (data.type === 'phasesOfCare') {
            const getPhasesOfCareCommand = new GetPhasesOfCare({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id
            });
            return await new CommandFactory().getCommand(
                getPhasesOfCareCommand.path,
                true,
                getPhasesOfCareCommand,
            );
        }
        if (data.type === 'nutrition') {
            const getNutritionCommand = new GetNutrition({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id
            });
            const { increase, decrease, avoid, count } = await new CommandFactory().getCommand(
                getNutritionCommand.path,
                true,
                getNutritionCommand,
            );
            const notes = await new ClientInternalNotes(HealthPlanType.NUTRITION).get(data);
            return { nutritions: { increase, decrease, avoid }, count, notes };
        }

        if (data.type === 'testing') {
            const getTestingCommand = new GetTests({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id
            });
            const { tests, count } = await new CommandFactory().getCommand(
                getTestingCommand.path,
                true,
                getTestingCommand,
            );
            const notes = await new ClientInternalNotes(HealthPlanType.TESTING).get(data);
            return { tests, count, notes };
        }

        if (data.type === 'supplement') {
            const getSupplementsCommand = new GetSupplements({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id
            });
            const { supplements, count } = await new CommandFactory().getCommand(
                getSupplementsCommand.path,
                true,
                getSupplementsCommand,
            );
            const notes = await new ClientInternalNotes(HealthPlanType.SUPPLEMENT).get(data);
            return { supplements, count, notes };
        }
        if (data.type === 'lifestyle') {
            const getLifeStyleCommand = new GetLifeStyle({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id
            });
            const { lifestyle, count } = await new CommandFactory().getCommand(
                getLifeStyleCommand.path,
                true,
                getLifeStyleCommand,
            );
            const notes = await new ClientInternalNotes(HealthPlanType.LIFESTYLE).get(data);
            return { lifestyle, count, notes };
        }
        if (data.type === 'message') {
            const notes = await new ClientInternalNotes(HealthPlanType.MESSAGE).get(data);
            return { notes };
        }
        if (data.type === 'preview') {
            return await new HealthPlanPreview().preview(data);
        }
    }

    /**
     * @param {data} data CreateHealthPlan
     * @return {Object}
     */
    async create(data: CreateHealthPlan) {
        await new ValidateClient(data.client_id).validate();
        // await new ValidateHealthPlan(data.health_plan_id).validate();
        if (data.type === 'phasesOfCare') {
            const createPhasesOfCareCommand = new CreatePhasesOfCare({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id,
                payload: data.payload
            });
            return await new CommandFactory().getCommand(
                createPhasesOfCareCommand.path,
                true,
                createPhasesOfCareCommand,
            );
        }

        if (data.type === 'nutrition') {
            if (data.payload) {
                const createNutritionCommand = new CreateNutrition({
                    client_id: data.client_id,
                    health_plan_id: data.health_plan_id,
                    payload: data.payload
                });
                await new CommandFactory().getCommand(
                    createNutritionCommand.path,
                    true,
                    createNutritionCommand,
                );
            }

            //Create or Update Notes
            if (data.notes) {
                await new ClientInternalNotes(HealthPlanType.NUTRITION).create(data);
            }
            return true;
        }
        if (data.type === 'testing') {
            const createTestCommand = new CreateTests({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id,
                payload: data.payload
            });
            await new CommandFactory().getCommand(
                createTestCommand.path,
                true,
                createTestCommand,
            );

            //Create or Update Notes
            if (data.notes) {
                await new ClientInternalNotes(HealthPlanType.TESTING).create(data);
            }
            return true;
        }

        if (data.type === 'supplement') {
            const createTestCommand = new CreateSupplements({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id,
                payload: data.payload
            });
            await new CommandFactory().getCommand(
                createTestCommand.path,
                true,
                createTestCommand,
            );

            //Create or Update Notes
            if (data.notes) {
                await new ClientInternalNotes(HealthPlanType.SUPPLEMENT).create(data);
            }
            return true;
        }

        if (data.type === 'lifestyle') {
            const createTestCommand = new CreateLifeStyle({
                client_id: data.client_id,
                health_plan_id: data.health_plan_id,
                payload: data.payload
            });
            await new CommandFactory().getCommand(
                createTestCommand.path,
                true,
                createTestCommand,
            );

            //Create or Update Notes
            if (data.notes) {
                await new ClientInternalNotes(HealthPlanType.LIFESTYLE).create(data);
            }
            return true;
        }

        if (data.type === 'message') {
            if (data.notes) {
                await new ClientInternalNotes(HealthPlanType.MESSAGE).create(data);
            }
            return true;
        }
    }

    /**
     * @param {data} data CreateHealthPlan
     * @return {Object}
     */
    async updateTimeStamp(data: CreateHealthPlan) {
        await ClientHealthPlanSchema.findByIdAndUpdate(
            data.health_plan_id,
            {
                last_modified_by: data.last_modified_by,
                last_modified_date: data.last_modified_date
            }
        );
    }
}
