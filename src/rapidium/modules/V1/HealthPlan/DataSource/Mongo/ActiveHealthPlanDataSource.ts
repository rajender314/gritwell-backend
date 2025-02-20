import { GetHealthPlanDetails }
    from '@basePath/HealthPlan/Commands/GetHealthPlanDetails';
import { CreateActivePlan }
    from '@basePath/HealthPlan/Commands/CreateActivePlan';
import { EditHealthPlan }
    from '@basePath/HealthPlan/Commands/EditHealthPlan';
import { EditInlineStatus }
    from '@basePath/HealthPlan/Commands/EditInlineStatus';
import { SubmitHealthPlan }
    from '@basePath/HealthPlan/Commands/SubmitHealthPlan';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { AppointmentStatusesSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
import { ClientStatusesSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientStatusesSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';

import { CurrentAppointment }
    from '@basePath/Appointments/Commands/CurrentAppointment';
import { HealthPlanDraft }
    from
    '@basePath/HealthPlan/DataSource/Mongo/HealthPlanDraft';
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
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ActiveHealthPlanDataSource
*/
export default class ActiveHealthPlanDataSource {
    /**
     * @param {data} data CreateActivePlan
     * @return {Object}
     */
    /**
     * @param {data} data CreateActivePlan
     * @return {Object}
     */
    async get(data: GetHealthPlanDetails) {
        const client = await UserSchema.findById(data.client_id);
        let clientInfo: any = {};
        let healthPlanInfo: any = {};
        if (client != null) {
            clientInfo.name = `${client.first_name} ${client.last_name}`;
            const healthPlan = await ClientHealthPlanSchema.findOne({ _id: data.health_plan_id });
            if (healthPlan != null) {
                healthPlanInfo.submitted_date = healthPlan.submitted_date;
                healthPlanInfo.last_modified_date = healthPlan.last_modified_date;
            }
        }
        return {
            clientInfo,
            healthPlanInfo
        };
    }
    async create(data: CreateActivePlan) {
        try {
            const activeHealthPlan = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.client_id), appointment_id: ObjectId(data.appointment_id), type: "draft" });
            if (activeHealthPlan == null) {
                return await ClientHealthPlanSchema.create({
                    client_id: data.client_id,
                    appointment_id: data.appointment_id,
                    appointment_type: data.appointment_type,
                    name: 'Health Plan',
                    type: "draft",
                    created_by: data.created_by,
                    created_date: data.created_date,
                    last_modified_by: data.last_modified_by,
                    last_modified_date: data.last_modified_date
                });
            } else {
                throw new ResourceNotFound('Health Plan Already Created', '');
            }
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
     * @param {data} data EditHealthPlan
     * @return {Object}
     */
    async edit(data: EditHealthPlan) {
        const currentAppointmentCommand = new CurrentAppointment({
            params: { client_id: data.client_id },
            decoded: data.userData
        });
        const currentAppointment = await new CommandFactory().getCommand(
            currentAppointmentCommand.path,
            true,
            currentAppointmentCommand,
        );
        let preAppointmentId: string = '';
        let postAppointmentId: string = '';
        let preAppointment: any = {};
        let postAppointment: any = {};

        if (currentAppointment != null && currentAppointment.pre != null && currentAppointment.pre._id != null) {
            preAppointmentId = currentAppointment.pre._id;
            const appointmentEndDate = new Date(currentAppointment.pre.end_date);
            const currentDate = new Date();
            const days = this.getDifferenceInDays(appointmentEndDate, currentDate);
            if (days <= 7) {
                preAppointment = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.client_id), appointment_id: currentAppointment.pre._id, type: "draft" });
            }
        }

        if (currentAppointment != null && currentAppointment.post != null && currentAppointment.post._id != null) {
            postAppointmentId = currentAppointment.post._id;
            postAppointment = currentAppointment.post;
        }
        if (preAppointment != null && Object.keys(preAppointment).length != 0) {
            return preAppointment;
        } else if (Object.keys(postAppointment).length != 0) {
            const followUpDraft = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.client_id), appointment_id: postAppointment._id, type: "draft" });
            if (followUpDraft != null) {
                return followUpDraft;
            }
            if (followUpDraft == null && preAppointmentId != '') {
                const preAppointmentHealthPlan = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.client_id), appointment_id: preAppointmentId, type: "published" });
                if (preAppointmentHealthPlan != null) {
                    return await new HealthPlanDraft(data.client_id, preAppointmentHealthPlan._id, postAppointment._id).draft(data);
                }
            }
        } else {
            throw new ResourceNotFound('Create Follow-up appointments to edit the health plan.', '');
        }
    }

    /**
     * @param {data} data SubmitHealthPlan
     * @return {Object}
     */
    async submit(data: SubmitHealthPlan) {
        //update existing health plan
        const healthPlanInfo = await ClientHealthPlanSchema.findById(data.health_plan_id);

        if (healthPlanInfo != null && healthPlanInfo.type === "published") {
            throw new ResourceNotFound('Health plan already submitted.', '');
        }

        if (healthPlanInfo != null && healthPlanInfo.type === "archive") {
            throw new ResourceNotFound('Archived Health plan cannot be submitted.', '');
        }

        if (healthPlanInfo != null && healthPlanInfo.type === "draft") {
            const statuses = await AppointmentStatusesSchema.find({ code: { $in: ['attended', 'late-show'] } });
            const attended = statuses.map((status) => ObjectId(status._id));
            const appointment = await AppointmentSchema.findOne({ _id: healthPlanInfo.appointment_id, "status": { $in: attended } });
            if (appointment != null) {
                const currentAppointmentCommand = new CurrentAppointment({
                    params: { client_id: data.client_id },
                    decoded: data.userData
                });
                const currentAppointment = await new CommandFactory().getCommand(
                    currentAppointmentCommand.path,
                    true,
                    currentAppointmentCommand,
                );
                if (currentAppointment != null && currentAppointment.pre != null && currentAppointment.pre._id != null && currentAppointment.pre._id.toString() === appointment._id.toString()) {
                    const appointmentEndDate = new Date(appointment.end_date);
                    const currentDate = new Date();
                    if (appointmentEndDate < currentDate) {
                        const days = this.getDifferenceInDays(appointmentEndDate, currentDate);
                        if (days <= 7) {
                            //Change Previous health plan from published to archive
                            const publishedHealthPlan = await ClientHealthPlanSchema.findOne({ client_id: data.client_id, appointment_id: healthPlanInfo.appointment_id, type: "published" });
                            if (publishedHealthPlan != null) {
                                await ClientHealthPlanSchema.findByIdAndUpdate(
                                    publishedHealthPlan._id,
                                    {
                                        type: 'archive'
                                    }
                                )
                            }
                            const drafts = await ClientHealthPlanSchema.countDocuments({ client_id: data.client_id, appointment_id: healthPlanInfo.appointment_id });
                            if (drafts < 2) {
                                await new HealthPlanDraft(data.client_id, data.health_plan_id, currentAppointment.pre._id).draft(data);
                            }
                            //submit health plan
                            await this.submitHealthPlan(data);
                            return true;
                        } else {
                            throw new ResourceNotFound('Health plan cannot be submitted after completion of one week .', '');
                        }
                    }
                } else {
                    throw new ResourceNotFound('Appoinment Id mismatch Error.', '');
                }
            } else {
                throw new ResourceNotFound('Please update the appointment attendance to submit the health plan.', '');
            }
        }
    }

    getDifferenceInDays(appointmentEndDate, currentDate) {
        const diffInMs = Math.abs(currentDate - appointmentEndDate);
        return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    }

    async submitHealthPlan(data: SubmitHealthPlan) {
        return await ClientHealthPlanSchema.findByIdAndUpdate(
            data.health_plan_id,
            {
                type: 'published',
                is_active: false,
                submitted_by: data.last_modified_by,
                submitted_date: data.last_modified_date
            },
            { new: true }
        )
    }
    /**
     * @param {data} data EditInlineStatus
     * @return {Object}
     */
    async editStatus(data: EditInlineStatus) {
        if (data.type === 'nutrition') {
            return await ClientNutritionSchema.findByIdAndUpdate(data.health_plan_row_id,
                { status: data.status }
            );
        }
        if (data.type === 'testing') {
            return await ClientTestsSchema.findByIdAndUpdate(data.health_plan_row_id,
                { status: data.status }
            );
        }
        if (data.type === 'supplement') {
            return await ClientSupplementsSchema.findByIdAndUpdate(data.health_plan_row_id,
                { status: data.status }
            );
        }
        if (data.type === 'lifestyle') {
            return await ClientLifeStyleSchema.findByIdAndUpdate(data.health_plan_row_id,
                { status: data.status }
            );
        }
    }
}
