import {ClientAssignment}
  from '@basePath/OfficeClients/Commands/ClientAssignment';
import {ClientAssignmentSchema}
  from
  '@basePath/OfficeClients/DataSource/Models/Schema/ClientAssignmentSchema';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import {OfficeUserSchema}
  from '@basePath/Admin/DataSource/Models/Schema/OfficeUserSchema';
import {IClientAssignmentUser}
  from '@basePath/OfficeClients/Interfaces/IClientAssignmentUser';

import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import ClientAssignedMailer
  from '@basePath/OfficeClients/Mailer/ClientAssignedMailer';
// eslint-disable-next-line
import CustomerSubscriptionOperations from '@basePath/Subscriptions/DataSource/Models/CustomerSubscriptionOperations';
import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
// import BaseHelper from '@rapCoreHelpers/BaseHelper';
/**
 * class ClientAssignmentDataSource
 */
export default class ClientAssignmentDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async clientAssignment(data: ClientAssignment) {
    // Verify Client
    try {
      const verifyClient = await UserSchema.findOne({
        _id: data.client_id,
        status: true,
      });
      if (verifyClient == null) {
        throw new ResourceNotFound('Client Not Available', '');
      }
      const user = await UserSchema.aggregate([
        {$match: {_id: ObjectId(data.assignment_user_id), status: true}},
        {
          $lookup: {
            from: 'office_users',
            localField: '_id',
            foreignField: 'user_id',
            as: 'user_data',
          },
        },
        {$unwind: {path: '$user_data', preserveNullAndEmptyArrays: true}},
        {
          $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: '_id',
            as: 'role_data',
          },
        },
        {$unwind: {path: '$role_data', preserveNullAndEmptyArrays: true}},
        {
          $project: {
            id: 1,
            office_user_id: '$user_data._id',
            allocation: '$user_data.allocation',
            available: '$user_data.available',
            role_id: '$role_data._id',
            code: '$role_data.code',
          },
        },
      ])
          .then((user: IClientAssignmentUser[]) => {
            return user[0];
          })
          .catch((error: any) => {
            throw new ResourceNotFound(error, '');
          });

      if (user) {
        const clientAssigned = await ClientAssignmentSchema.find({
          client_id: data.client_id,
          type: user.code,
        }).countDocuments();
        if (clientAssigned < 1) {
          const healthCoachAssigned = await ClientAssignmentSchema.find({
            client_id: data.client_id,
            type: 'health_coach',
          }).countDocuments();
          if (user.code === 'health_coach' && healthCoachAssigned === 0) {
            return await this.createClientAssignment(user, data, verifyClient);
          } else {
            if (user.code === 'md' && healthCoachAssigned === 0) {
              throw new ResourceNotFound(
                  'Please Assign Health Coach first',
                  '',
              );
            } else {
              return await this.createClientAssignment(
                  user,
                  data,
                  verifyClient,
              );
            }
          }
        } else {
          throw new ResourceNotFound('Client Already Assigned', '');
        }
      } else {
        throw new ResourceNotFound('No User Found', '');
      }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
   * @param {user} user
   * @param {data} data
   * @param {clientInfo} clientInfo
   * @return {Object}
   */
  async createClientAssignment(
      user: IClientAssignmentUser,
      data: ClientAssignment,
      clientInfo:any,
  ) {
    try {
      data.assigned_by = data.user_data.user_id;
      data.assigned_date = new Date();
      data.type = user.code;

      ClientAssignmentSchema.create({
        client_id: data.client_id,
        assignment_user_id: data.assignment_user_id,
        type: data.type,
        assigned_by: data.assigned_by,
        assigned_date: data.assigned_date,
        created_by: data.created_by,
        created_date: data.created_date,
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date,
      });
      const available = user.available - 1;
      if (available >= 0) {
        await OfficeUserSchema.findOneAndUpdate(
            {user_id: ObjectId(data.assignment_user_id)},
            {available: available},
            {new: true},
        );
      }
      /** Email sending code */

      const displayName = clientInfo.first_name + ' ' + clientInfo.last_name;

      new ClientAssignedMailer().clientAssignedEmail({
        displayName: displayName,
        email: clientInfo.email,
        code: user.code,
      });
      if (user.code ==='health_coach') {
        await CustomerSchema.findOneAndUpdate(
            {user_id: data.client_id},
            {current_health_journey_status: 'meet_your_health_coach'},
        );
      }


      const label = user.code == 'health_coach' ? 'health coach' : 'md';
      return `Client has been assigned a ${label} successfully`;
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
