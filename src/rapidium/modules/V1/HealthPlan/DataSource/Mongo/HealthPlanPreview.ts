import { GetHealthPlan }
    from '@basePath/HealthPlan/Commands/GetHealthPlan';
import { GetPhasesOfCare }
    from '@basePath/HealthPlan/Commands/GetPhasesOfCare';
import { GetNutrition }
    from '@basePath/HealthPlan/Commands/GetNutrition';
import { GetTests }
    from '@basePath/HealthPlan/Commands/GetTests';
import { GetSupplements }
    from '@basePath/HealthPlan/Commands/GetSupplements';
import { GetLifeStyle }
    from '@basePath/HealthPlan/Commands/GetLifeStyle';
import { ClientInternalNotes } from
    '@basePath/HealthPlan/DataSource/Mongo/ClientInternalNotes';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { HealthPlanType } from '@basePath/HealthPlan/Interfaces/IHealthPlan';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class HealthPlanPreview
*/
export class HealthPlanPreview {
    /**
     * @param {data} data GetHealthPlan
     * @return {Object}
     */
    async preview(data: GetHealthPlan) {
        const client = await UserSchema.findById(data.client_id);
        let clientInfo: any = {};
        let healthPlanInfo: any = {};
        if (client != null) {
            clientInfo.name = `${client.first_name} ${client.last_name}`;
            clientInfo.client_id = client._id;
            // const healthPlan = await ClientHealthPlanSchema.findOne({ client_id: data.client_id });
            const healthPlan = await ClientHealthPlanSchema.findById(data.health_plan_id);
            if (healthPlan != null) {
                // healthPlanInfo.is_submitted = healthPlan.is_submitted;
                healthPlanInfo.submitted_date = healthPlan.submitted_date;
                healthPlanInfo.last_modified_date = healthPlan.last_modified_date;
            }
        }
        const getPhasesOfCareCommand = new GetPhasesOfCare({
            client_id: data.client_id,
            health_plan_id: data.health_plan_id
        });
        const phasesOfCare = await new CommandFactory().getCommand(
            getPhasesOfCareCommand.path,
            true,
            getPhasesOfCareCommand,
        );

        const getNutritionCommand = new GetNutrition({
            client_id: data.client_id,
            health_plan_id: data.health_plan_id
        });
        const { increase, decrease, avoid } = await new CommandFactory().getCommand(
            getNutritionCommand.path,
            true,
            getNutritionCommand,
        );
        const nutritionNotes = await new ClientInternalNotes(HealthPlanType.NUTRITION).get(data);

        const getTestingCommand = new GetTests({
            client_id: data.client_id,
            health_plan_id: data.health_plan_id
        });
        const { tests } = await new CommandFactory().getCommand(
            getTestingCommand.path,
            true,
            getTestingCommand,
        );
        const testNotes = await new ClientInternalNotes(HealthPlanType.TESTING).get(data);

        const getSupplementsCommand = new GetSupplements({
            client_id: data.client_id,
            health_plan_id: data.health_plan_id
        });
        const { supplements } = await new CommandFactory().getCommand(
            getSupplementsCommand.path,
            true,
            getSupplementsCommand,
        );
        const supplementNotes = await new ClientInternalNotes(HealthPlanType.SUPPLEMENT).get(data);

        const getLifeStyleCommand = new GetLifeStyle({
            client_id: data.client_id,
            health_plan_id: data.health_plan_id
        });
        const { lifestyle } = await new CommandFactory().getCommand(
            getLifeStyleCommand.path,
            true,
            getLifeStyleCommand,
        );
        const lifestyleNotes = await new ClientInternalNotes(HealthPlanType.LIFESTYLE).get(data);

        const message = await new ClientInternalNotes(HealthPlanType.MESSAGE).get(data);

        return {
            clientInfo,
            healthPlanInfo,
            phasesOfCare: phasesOfCare.result,
            nutrition: { increase, decrease, avoid, notes: nutritionNotes },
            tests: { items: tests, notes: testNotes },
            supplements: { items: supplements, notes: supplementNotes },
            lifestyle: { items: lifestyle, notes: lifestyleNotes },
            message
        };
    }

}
