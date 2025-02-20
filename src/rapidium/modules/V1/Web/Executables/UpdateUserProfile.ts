import UserProfileDataSource
  from '@basePath/Web/DataSource/Mongo/UserProfileDataSource';
/**
 * Executable file for UpdateUserProfile
 */
class UpdateUserProfile {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new UserProfileDataSource().updateUserProfile(data);
  }
}
module.exports = UpdateUserProfile;
