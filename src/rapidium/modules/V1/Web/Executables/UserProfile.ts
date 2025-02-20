import UserProfileDataSource
  from '@basePath/Web/DataSource/Mongo/UserProfileDataSource';
/**
 * Executable file for UserProfile
 */
class UserProfile {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new UserProfileDataSource().getUserProfile(data);
  }
}
module.exports = UserProfile;
