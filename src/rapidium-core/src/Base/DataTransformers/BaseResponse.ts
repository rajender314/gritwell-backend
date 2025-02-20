/**
 * class BaseResponse
 */
export default class BaseResponse {
  public success: boolean;
  public message: any;
  public status_code: number;
  public data: any;
  protected listMessages = [];
  /**
 * constructor
 * @param {data} data
 * @param {success} success
 * @param {errorCode} errorCode
 * @param {message} message
 */
  constructor(data: any, success: boolean, errorCode = 200, message = '') {
    this.success = success;
    this.data = data;
    this.message = message;
    this.status_code = errorCode;
  }
  /**
 * @return {Object}
 */
  async formatMessage() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      status_code: this.status_code,
    };
  }
}
