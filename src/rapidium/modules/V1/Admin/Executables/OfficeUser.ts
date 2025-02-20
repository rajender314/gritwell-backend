import AdminDataSource from '@basePath/Admin/DataSource/Mongo/AdminDataSource';
/**
 * class OfficeUser
 */
class OfficeUser {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new AdminDataSource().createOffiecUser(data);
  }
}
module.exports = OfficeUser;
