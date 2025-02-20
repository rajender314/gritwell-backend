
let objUser: any;
/**
 * class AuthHelper
 */
export default class AuthHelper {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @return {Object}
 */
  getUserDetails() {
    return objUser;
  }
  /**
 *
 * @param {user} user
 */
  setValues(user: any) {
    objUser = user;
  }
}
