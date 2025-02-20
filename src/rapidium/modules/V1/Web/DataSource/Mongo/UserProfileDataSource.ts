
import {GetUserDetails} from '@basePath/Admin/Commands/GetUserDetails';
import {GetClientDetails}
  from '@basePath/OfficeClients/Commands/GetClientDetails';
import {UpdateUser} from '@basePath/Admin/Commands/UpdateUser';
import {UpdateClient} from '@basePath/OfficeClients/Commands/UpdateClient';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {UserProfile} from '@basePath/Web/Commands/UserProfile';
import {UpdateUserProfile} from '@basePath/Web/Commands/UpdateUserProfile';
import {DeleteUserProfilePic}
  from '@basePath/Web/Commands/DeleteUserProfilePic';
import {DeleteProfilePicture}
  from '@basePath/Admin/Commands/DeleteProfilePicture';
import {TextlineIntegration}
  from '@basePath/Web/Commands/TextlineIntegration';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {TextLineSchema}
  from '@basePath/Admin/DataSource/Models/Schema/TextLineSchema';

import {CustomerHealthJourneySchema} from '@basePath/Customer/DataSource/Models/Schema/CustomerHealthJourneySchema';
/**
 * class UserProfileDataSource
 */
export default class UserProfileDataSource {
  /**
   *
   * @param {data} data
   * @return {Object} user Profile
   */
  async getUserProfile(data: UserProfile) {
    try {
      if ( parseInt(data.userData.user_type) === 2) {
        const userCommand = new GetClientDetails({
          params: {id: data.userData.user_id},
        });
        const customerData = await new CommandFactory().getCommand(
            userCommand.path,
            true,
            userCommand,
        );

        const healthJourneyInfo:any = await CustomerHealthJourneySchema.find({status: true}).sort({order: 1});


        customerData.healthJourney = healthJourneyInfo.length>0 ? healthJourneyInfo :[];
        return customerData;
      }
      if (data.userData.user_id) {
        const userCommand = new GetUserDetails({
          params: {id: data.userData.user_id},
        });
        return await new CommandFactory().getCommand(
            userCommand.path,
            true,
            userCommand,
        );
      }
      // else {
      //   return 'No User Found';
      // }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
   *
   * @param {data} data
   * @return {Object} update user profile and returns User Schema
   */
  async updateUserProfile(data: UpdateUserProfile) {
    try {
      if ( parseInt(data.userData.user_type) === 2) {
        const tokenCommand = new UpdateClient({
          params: {id: String(data.userData.user_id)},
          body: data,
        });
        return await new CommandFactory().getCommand(
            tokenCommand.path,
            true,
            tokenCommand,
        );
      }
      if (data.userData.user_id) {
        const tokenCommand = new UpdateUser({
          params: {id: String(data.userData.user_id)},
          body: data,
        });
        return await new CommandFactory().getCommand(
            tokenCommand.path,
            true,
            tokenCommand,
        );
      }
      // else {
      //   return 'No User Found';
      // }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
   *
   * @param {data} data DeleteProfilePicture Command
   * @return {Object} update user profile and returns User Schema
   */
  async deleteUserProfilePic(data: DeleteUserProfilePic) {
    try {
      const userCommand = new DeleteProfilePicture({
        params: {id: data.userData.user_id},
      });
      return await new CommandFactory().getCommand(
          userCommand.path,
          true,
          userCommand,
      );
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
   *
   * @param {data} data DeleteProfilePicture Command
   * @return {Object} update user profile and returns User Schema
   */
  async textLineIntegration(data: TextlineIntegration) {
    try {
      return await TextLineSchema.create({
        data: data,
      });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
