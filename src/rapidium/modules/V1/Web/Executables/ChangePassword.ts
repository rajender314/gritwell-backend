import ChangePasswordDataSource
  from '@basePath/Web/DataSource/Mongo/ChangePasswordDataSource';
/**
 * Executable file for ChangePassword
 */
class ChangePassword {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new ChangePasswordDataSource().changePassword(data);
  }
}
module.exports = ChangePassword;
