import { ClientRecentActivities }
    from '@basePath/OfficeClients/Commands/ClientRecentActivities';
import { CustomerRecentActivitySchema }
    from '@basePath/Customer/DataSource/Models/Schema/CustomerRecentActivitySchema';
import { CustomerRecentActivityActionsSchema }
    from '@basePath/OfficeClients/DataSource/Models/Schema/CustomerRecentActivityActionsSchema';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
 * class ClientAppointmentsDataSource
 */
export default class ClientRecentActivityDataSource {
    /**
     * @param {data} data
     * @return {Object}
     */
    async getActivities(data: ClientRecentActivities) {
        const recentActivityActions = await CustomerRecentActivityActionsSchema.find({});
        const actions: any = [];
        if (recentActivityActions.length) {
            recentActivityActions.map(action => {
                actions[action.action] = action.message;
            });
        }
        const totalCount = await CustomerRecentActivitySchema.countDocuments({ "client_id": data.client_id });
        const recentActivities = await CustomerRecentActivitySchema.find(
            {
                "client_id": ObjectId(data.client_id)
            }
        );
        let ClientRecentActivities: any = [];
        if (recentActivities.length) {
            recentActivities.map(recentActivcity => {
                let obj: any = {};
                const { created_info, client_info, created_date, is_internal, collection_payload, action } = recentActivcity;
                obj.created_date = created_date;
                obj.is_internal = is_internal;
                obj.action = action;
                if (actions[recentActivcity.action]) {
                    obj.message = actions[recentActivcity.action];
                } 
                if (recentActivcity.action === 'HEALTH_COACH_ASSIGNED' || recentActivcity.action === 'MD_ASSIGNED') {
                    let messageData: any = {};
                    messageData.created_by = { text: `${created_info.first_name} ${created_info.last_name}`, bold: true }
                    messageData.assignment_details = { text: `${collection_payload.assignment_details.first_name} ${collection_payload.assignment_details.last_name}`, bold: true }
                    obj.message_data = messageData;
                }
                if (recentActivcity.action === 'SYMPTOM_ANALYSIS_SUBMITTED' || recentActivcity.action === 'INTAKE_SUBMITTED') {
                    let messageData: any = {};
                    messageData.client_name = { text: `${client_info.first_name} ${client_info.last_name}`, bold: true }
                    obj.message_data = messageData;
                }
                ClientRecentActivities.push(obj);
            });
        }
        return { count: totalCount, result: ClientRecentActivities };
    }
}
