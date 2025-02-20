import {UserLogSchema}
  from '@basePath/Admin/DataSource/Models/Schema/UserLogSchema';
/**
 * class UserLog
 */
export default class UserLog {
  /**
   *
   * @param {user} user
   * @param {data} data
   * @return {Object}
   */
  async log(user: any, data: any) {
    const userdata = Object.assign(user,
        {'useragent': data.useragent},
        {'login_time': data.login_time || ''},
        {'logout_time': data.logout_time || ''},
    );
    return UserLogSchema.create(userdata).then(async (userlog) => {
      return {userlog};
    });
  }
}
