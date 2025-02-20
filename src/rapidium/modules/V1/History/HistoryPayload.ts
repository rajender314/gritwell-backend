import { UserSchema }
  from
  '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { CustomerRecentActivityConstants }
  from
  '@basePath/Constants/CustomerRecentActivityConstants';
import BaseHelper from '@rapCoreHelpers/BaseHelper';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
 * class HistoryPayload
 */
export default class HistoryPayload {
  /**
    * @param {collection} string
   * @return {Object}
   */
  async get(history) {
    let payload: any = {};
    const { clientDetails, userDetails } = await this.getUserDetails(history);
    const date = new BaseHelper().Date();
    if (history.collectionName === 'customer') {
      if (history.type === 'update') {
        let symptomAnalysisSubmitted = history.diff &&
          history.diff.symptom_analysis_submitted &&
          history.diff.symptom_analysis_submitted[1] ?
          history.diff.symptom_analysis_submitted[1] : false;

        let intakeSubmitted = history.diff &&
          history.diff.intake_submitted &&
          history.diff.intake_submitted[1] ?
          history.diff.intake_submitted[1] : false;

        payload = {
          "collection_id": ObjectId(history.collectionId),
          "client_id": ObjectId(history.clientId),
          "client_info": clientDetails,
          "collection_name": history.collectionName,
          "collection_payload": {},
          "created_by": history.user,
          "created_info": userDetails,
          "created_date": date,
        }
        if (symptomAnalysisSubmitted) {
          payload.action = CustomerRecentActivityConstants.SYMPTOM_ANALYSIS_SUBMITTED;
        }
        if (intakeSubmitted) {
          payload.action = CustomerRecentActivityConstants.INTAKE_SUBMITTED;
        }
        if (payload.action) {
          return payload;
        }
      }
    }

    if (history.collectionName === 'customer_assignments') {
    
      let assignType = history.diff &&
        history.diff.type &&
        history.diff.type[0] ?
        history.diff.type[0] : '';
      if (assignType) {
        if (history.type === 'create') {
          const assignmentUserId = history.diff && history.diff.assignment_user_id && history.diff.assignment_user_id[0] ? history.diff.assignment_user_id[0] : '';
          const { clientDetails, userDetails } = await this.getUserDetails(history);
          const { assignmentDetails } = await this.getAssignmentDetails(assignmentUserId)
          payload = {
            "collection_id": ObjectId(history.collectionId),
            "client_id": ObjectId(history.clientId),
            "client_info": clientDetails,
            "collection_name": history.collectionName,
            "is_internal": true,
            "collection_payload": { assignment_details: assignmentDetails },
            "created_by": history.user,
            "created_info": userDetails,
            "created_date": date,
          }
          if (assignType === 'health_coach') {
            payload.action = CustomerRecentActivityConstants.HEALTH_COACH_ASSIGNED;
          }
          if (assignType === 'md') {
            payload.action = CustomerRecentActivityConstants.MD_ASSIGNED;
          }
          return payload;
        }
      }
    }
  }

  async getUserDetails(history) {
    const usersData = await UserSchema.find({ _id: { $in: [ObjectId(history.clientId), history.user] } });
    let clientDetails: any = {};
    let userDetails: any = {};
    if (usersData.length) {
      usersData.map(users => {
        if (users.user_type === 1) {
          userDetails = {
            first_name: users.first_name,
            last_name: users.last_name,
          }
        }
        if (users.user_type === 2) {
          clientDetails = {
            first_name: users.first_name,
            last_name: users.last_name,
          }
        }
      })
    }
    return { clientDetails, userDetails };
  }

  async getAssignmentDetails(assignmentUserId) {
    const assignmentDetails = await UserSchema.findOne({ _id: assignmentUserId }, { first_name: 1, last_name: 1 });
    return { assignmentDetails }
  }
}
