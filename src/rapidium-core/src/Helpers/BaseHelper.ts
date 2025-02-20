import moment from 'moment-timezone';
/**
 * class BaseHelper
 */
export default class BaseHelper {
  /**
   * constructor
   */
  constructor() { }
  /**
    * @param {date} date
   * @param {formats} formats
   * @return {Object}
   */
  public Date(date = null, formats = 'YYYY-MM-DD HH-mm-ss') {
    if (date) {
      return moment(date).tz('GMT').toISOString();
    } else {
      return moment().tz('GMT').toISOString();
    }
  }
}
