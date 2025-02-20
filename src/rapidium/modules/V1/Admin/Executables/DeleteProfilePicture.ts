import UsersDataSource from '../DataSource/Mongo/UsersDataSource';
/**
 * class DeleteProfilePicture
 */
class DeleteProfilePicture {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new UsersDataSource().deleteProfilePicture(data);
  }
}
module.exports = DeleteProfilePicture;
