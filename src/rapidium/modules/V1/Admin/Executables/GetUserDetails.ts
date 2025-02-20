import UsersDataSource from '@basePath/Admin/DataSource/Mongo/UsersDataSource';
/**
 * class GetUserDetails
 */
class GetUserDetails {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new UsersDataSource().getUserDetails(data);
  }
}
module.exports = GetUserDetails;
