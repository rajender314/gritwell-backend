import { GetHealthPlan }
    from '@basePath/HealthPlan/Commands/GetHealthPlan';
import { CreateHealthPlan }
    from '@basePath/HealthPlan/Commands/CreateHealthPlan';
import { ClientInternalNotesSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientInternalNotesSchema'; 
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientInternalNotes
*/
export class ClientInternalNotes {
    public type: string;
    constructor(type) {
        this.type = type;
    }
    /**
     * @param {data} data CreateHealthPlan
     * @return {Object}
     */
    async create(data: CreateHealthPlan) {
        const type = this.type;
        try {
            await ClientInternalNotesSchema.findOne({ 'client_id': ObjectId(data.client_id), 'health_plan_id': ObjectId(data.health_plan_id), 'type': type }).then(async (notes) => {
                if (notes != null) {
                    await ClientInternalNotesSchema.findByIdAndUpdate(
                        notes._id,
                        {
                            notes: data.notes,
                            last_modified_by: data.last_modified_by,
                            last_modified_date: data.last_modified_date
                        },
                        { new: true }
                    )
                } else {
                    await ClientInternalNotesSchema.create({
                        client_id: data.client_id,
                        health_plan_id: data.health_plan_id,
                        type: type,
                        notes: data.notes,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    });
                }
            })
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
     * @param {data} data GetHealthPlan
     * @return {Object}
     */
    async get(data: GetHealthPlan) {
        let clientNotes: string = '';
        const notes = await ClientInternalNotesSchema.findOne({ 'client_id': ObjectId(data.client_id), 'health_plan_id': ObjectId(data.health_plan_id), 'type': this.type });
        if (notes != null) {
            clientNotes = notes.notes
        }
        return clientNotes;
    }
}
