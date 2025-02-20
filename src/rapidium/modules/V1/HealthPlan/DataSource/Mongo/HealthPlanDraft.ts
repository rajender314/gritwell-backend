import { EditHealthPlan }
    from '@basePath/HealthPlan/Commands/EditHealthPlan';
import { ClientStatusesSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientStatusesSchema';
import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { ClientPhasesOfCareSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientPhasesOfCareSchema';
import { ClientNutritionSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientNutritionSchema';
import { ClientTestsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientTestsSchema';
import { ClientSupplementsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientSupplementsSchema';
import { ClientLifeStyleSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientLifeStyleSchema';
import { ClientInternalNotesSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientInternalNotesSchema';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class HealthPlanDraft
*/
export class HealthPlanDraft {

    public client_id: string;
    public health_plan_id: string;
    public appointment_id: string;
    constructor(client_id: string, health_plan_id: string, appointment_id: string) {
        this.client_id = client_id;
        this.health_plan_id = health_plan_id;
        this.appointment_id = appointment_id;
    }

    /**
     * @param {data} data EditHealthPlan
     * @return {Object}
     */
    async draft(data: any) {

        const planStatus = await ClientStatusesSchema.findOne({ code: 'not_approved' });
        if (planStatus != null) {
            const activeHealthPlan = await ClientHealthPlanSchema.create({
                client_id: this.client_id,
                appointment_id: this.appointment_id,
                name: 'Health Plan',
                type: 'draft',
                plan_status: planStatus._id,
                created_by: data.created_by,
                created_date: data.created_date,
                last_modified_by: data.last_modified_by,
                last_modified_date: data.last_modified_date
            });

            //Phases of Care
            const phasesOfCare = await ClientPhasesOfCareSchema.find(
                {
                    "client_id": ObjectId(this.client_id),
                    "health_plan_id": ObjectId(this.health_plan_id)
                }
            )
            let phases: any = []
            if (phasesOfCare.length) {
                phasesOfCare.map(phase => {
                    let insertData: any = {
                        client_id: this.client_id,
                        health_plan_id: activeHealthPlan._id,
                        name: phase.name,
                        description: phase.description,
                        status: phase.status,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    }
                    phases.push(insertData);
                });
            }
            if (phases.length > 0) {
                await ClientPhasesOfCareSchema.create(phases);
            }


            //Nutritions
            const dbNutritions = await ClientNutritionSchema.find(
                {
                    "client_id": ObjectId(this.client_id),
                    "health_plan_id": ObjectId(this.health_plan_id)
                }
            )
            let nutritions: any = [];
            if (dbNutritions.length) {
                dbNutritions.map(nutrition => {
                    let insertData: any = {
                        client_id: this.client_id,
                        health_plan_id: activeHealthPlan._id,
                        nutrition_id: nutrition.nutrition_id,
                        description: nutrition.description,
                        type: nutrition.type,
                        frequency_id: nutrition.frequency_id,
                        status: nutrition.status,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    }
                    nutritions.push(insertData);
                });
            }
            if (nutritions.length > 0) {
                await ClientNutritionSchema.create(nutritions);
            }

            //Tests
            const dbTests = await ClientTestsSchema.find(
                {
                    "client_id": ObjectId(this.client_id),
                    "health_plan_id": ObjectId(this.health_plan_id)
                }
            )
            let tests: any = [];
            if (dbTests.length) {
                dbTests.map(test => {
                    let insertData: any = {
                        client_id: this.client_id,
                        health_plan_id: activeHealthPlan._id,
                        test_id: test.test_id,
                        description: test.description,
                        frequency_id: test.frequency_id,
                        status: test.status,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    }
                    tests.push(insertData);
                });
            }
            if (tests.length > 0) {
                await ClientTestsSchema.create(tests);
            }

            //Supplements
            const dbSupplements = await ClientSupplementsSchema.find(
                {
                    "client_id": ObjectId(this.client_id),
                    "health_plan_id": ObjectId(this.health_plan_id)
                }
            )
            let supplements: any = [];
            if (dbSupplements.length) {
                dbSupplements.map(supplement => {
                    let insertData: any = {
                        client_id: this.client_id,
                        health_plan_id: activeHealthPlan._id,
                        supplement_id: supplement.supplement_id,
                        description: supplement.description,
                        quantity: supplement.quantity,
                        unit_id: supplement.unit_id,
                        duration: supplement.duration,
                        status: supplement.status,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    }
                    supplements.push(insertData);
                });
            }
            if (supplements.length > 0) {
                await ClientSupplementsSchema.create(supplements);
            }

            //LifeStyle
            const dbLifeStyle = await ClientLifeStyleSchema.find(
                {
                    "client_id": ObjectId(this.client_id),
                    "health_plan_id": ObjectId(this.health_plan_id)
                }
            )
            let lifestyles: any = [];
            if (dbLifeStyle.length) {
                dbLifeStyle.map(lifestyle => {
                    let insertData: any = {
                        client_id: this.client_id,
                        health_plan_id: activeHealthPlan._id,
                        lifestyle_id: lifestyle.lifestyle_id,
                        description: lifestyle.description,
                        frequency_id: lifestyle.frequency_id,
                        status: lifestyle.status,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    }
                    lifestyles.push(insertData);
                });
            }
            if (lifestyles.length > 0) {
                await ClientLifeStyleSchema.create(lifestyles);
            }


            let notesData: any = [];
            const notes = await ClientInternalNotesSchema.find({ 'client_id': ObjectId(this.client_id), 'health_plan_id': ObjectId(this.health_plan_id) });
            if (notes.length) {
                const updatedNotes = notes.map(note => {
                    const { notes, type } = note;
                    return { notes, type }
                });
                if (updatedNotes.length) {
                    updatedNotes.map(note => {
                        notesData.push({
                            client_id: this.client_id,
                            health_plan_id: activeHealthPlan._id,
                            notes: note.notes,
                            type: note.type,
                            created_by: data.created_by,
                            created_date: data.created_date,
                            last_modified_by: data.last_modified_by,
                            last_modified_date: data.last_modified_date
                        })
                    });
                }
                if (notesData.length) {
                    await ClientInternalNotesSchema.create(notesData);
                }
            }
            return activeHealthPlan;
        }
    }
}
