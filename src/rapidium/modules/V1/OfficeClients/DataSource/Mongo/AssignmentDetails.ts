
// eslint-disable-next-line
import { ClientAssignmentSchema } from '@basePath/OfficeClients/DataSource/Models/Schema/ClientAssignmentSchema';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
const environment = process.env;
/**
 * class AssignmentDetails
 */
export default class AssignmentDetails {
  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async get(data) {
    return await ClientAssignmentSchema.aggregate([
      { $match: { client_id: ObjectId(data.id) } },
      {
        $lookup: {
          from: 'office_users',
          localField: 'assignment_user_id',
          foreignField: 'user_id',
          as: 'assignment_data',
        },
      },
      {
        $unwind: {
          path: '$assignment_data',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'assignment_user_id',
          foreignField: '_id',
          as: 'user_data',
        },
      },
      {
        $unwind: {
          path: '$user_data',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          id: 1,
          type: 1,
          acuity_calendar_id: '$user_data.acuity_calendar_id' ?
            '$user_data.acuity_calendar_id' : '',
          first_name: '$assignment_data.first_name',
          last_name: '$assignment_data.last_name',
          background: '$assignment_data.background',
          qualifications: '$assignment_data.qualifications',
          img_name: '$assignment_data.img_unique_name',
          display_url: '$assignment_data.img_unique_name',
          // display_url: '$assignment_data.img_unique_name' ?
          // {
          //     $concat: [
          //     environment.api_base_url,
          //     '',
          //     '$assignment_data.img_unique_name',
          //     ],
          // } :
          // '',
        },
      },
    ]).then((assignments) => {
      let hcAssigned = false;
      let mdAssigned = false;
      const ClientAssignments: any = {};
      const assignmentsData: any = {};
      if (assignments.length > 0) {
        assignments.map((assignment) => {
          let key = '';
          let key2 = '';
          if (assignment.type === 'health_coach') {
            hcAssigned = true;
            key = 'Health Coach';
            key2 = 'health_coach';
          }
          if (assignment.type === 'md') {
            mdAssigned = true;
            key = 'MD';
            key2 = 'practitioner'
          }
          if (key) {
            const a = {
              [key]: assignment.first_name,
            };
            ClientAssignments[key] = {
              name: assignment.first_name,
              background: assignment.background,
              qualifications: assignment.qualifications,
              img_name: assignment.img_name,
              display_url: assignment.display_url ?
                environment.api_base_url + '' + assignment.display_url :
                '',
              acuity_calendar_id: assignment.acuity_calendar_id,
              acuity_owner_id: environment.ACUITY_OWNER_ID,
            };
          }
          if (key2) {
            assignmentsData[key2] = {
              first_name: assignment.first_name,
              last_name: assignment.last_name,
              background: assignment.background,
              qualifications: assignment.qualifications,
              img_name: assignment.img_name,
              display_url: assignment.display_url ?
                environment.api_base_url + '' + assignment.display_url :
                '',
              acuity_calendar_id: assignment.acuity_calendar_id,
              acuity_owner_id: environment.ACUITY_OWNER_ID,
            };
          }
        });
      }
      return {
        hc_assigned: hcAssigned,
        md_assigned: mdAssigned,
        assignments: assignmentsData,
        ClientAssignments: ClientAssignments,
      };
    });
  }
}
