import UsersDataSource from '@basePath/Admin/DataSource/Mongo/UsersDataSource';
/**
 * class CreateUser
 */
class CreateUser {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new UsersDataSource().createUser(data);
  }
}
module.exports = CreateUser;
