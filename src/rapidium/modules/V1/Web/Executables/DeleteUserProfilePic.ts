import UserProfileDataSource
  from '@basePath/Web/DataSource/Mongo/UserProfileDataSource';
/**
 * Executable file for DeleteUserProfilePic
 */
class DeleteUserProfilePic {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new UserProfileDataSource().deleteUserProfilePic(data);
  }
}
module.exports = DeleteUserProfilePic;
