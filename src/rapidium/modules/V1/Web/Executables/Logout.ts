import AdminDataSource from '@basePath/Web/DataSource/Mongo/LoginDataSource';
/**
 * Executable file for Logout
 */
class Logout {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new AdminDataSource().logout(data);
  }
}
module.exports = Logout;
