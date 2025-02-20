import { GetClientDetails }
    from '@basePath/OfficeClients/Commands/GetClientDetails';
import { ClientHealthPlanSchema } from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import { CurrentAppointment }
    from '@basePath/Appointments/Commands/CurrentAppointment';
import { HealthPlanDraft }
    from
    '@basePath/HealthPlan/DataSource/Mongo/HealthPlanDraft';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';

export default class ClientHealthPlan {
    public currentAppointment: any;
    constructor(currentAppointment) {
        this.currentAppointment = currentAppointment;
    }
    async active(data: GetClientDetails) {

        let healthPlan: any = {};
        if (this.currentAppointment != null && this.currentAppointment.pre != null &&
            this.currentAppointment.pre._id != null) {
            healthPlan = await ClientHealthPlanSchema.findOne(
                { client_id: ObjectId(data.id), appointment_id: this.currentAppointment.pre._id, type: "published" },
                { name: 1, type: 1, appointment_id: 1, last_modified_date: 1 }
            );
        }
        return healthPlan;
    }

    async draft(data: GetClientDetails) {
        try { 
            let preAppointmentId: string = '';
            let postAppointmentId: string = '';
            let currentAppointmentId: string = '';
            let preAppointment: any = {};
            let postAppointment: any = {};
            let currentAppointment: any = {};

            if (this.currentAppointment != null && this.currentAppointment.pre != null && this.currentAppointment.pre._id != null) {
                preAppointmentId = this.currentAppointment.pre._id;
                const appointmentEndDate = new Date(this.currentAppointment.pre.end_date);
                const currentDate = new Date();
                const days = this.getDifferenceInDays(appointmentEndDate, currentDate);
                if (days <= 7) {
                    preAppointment = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.id), appointment_id: this.currentAppointment.pre._id, type: "draft" });
                }
            }

            if (this.currentAppointment != null && this.currentAppointment.post != null && this.currentAppointment.post._id != null) {
                postAppointmentId = this.currentAppointment.post._id;
                postAppointment = this.currentAppointment.post;
            }

            if (this.currentAppointment != null && this.currentAppointment.current != null && this.currentAppointment.current._id != null) {
                currentAppointmentId = this.currentAppointment.current._id;
                currentAppointment = this.currentAppointment.current;
            }

            if (preAppointment != null && Object.keys(preAppointment).length != 0) {
                return preAppointment;
            } else if (Object.keys(postAppointment).length != 0) {
                const followUpDraft = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.id), appointment_id: postAppointment._id });
                if (followUpDraft != null) {
                    return followUpDraft;
                }
                if (followUpDraft == null && preAppointmentId != '') {
                    const preAppointmentHealthPlan = await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.id), appointment_id: preAppointmentId, type: "published" });
                    if (preAppointmentHealthPlan != null) {
                        return await new HealthPlanDraft(data.id, preAppointmentHealthPlan._id, postAppointment._id).draft(data);
                    }
                } else {
                    return {};
                }
            } else if (currentAppointmentId != '') {
                return await ClientHealthPlanSchema.findOne({ client_id: ObjectId(data.id), appointment_id: currentAppointmentId, type: "draft" });
            }
            else {
                return {}; //No Follow-up appointments;
            }
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    getDifferenceInDays(appointmentEndDate, currentDate) {
        const diffInMs = Math.abs(currentDate - appointmentEndDate);
        return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    }
}