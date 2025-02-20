import {MiddlewareException}
  from '@src/rapidium-core/src/Base/Exceptions/MiddlewareException';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

require('dotenv').config();

/**
 * DataSource file for MiddlewareDataSource
 */
export default class MiddlewareDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async verifyMe(data: any) {
    const x = 0;
    if (x) return {isMiddlewarePassed: true};
    else throw new MiddlewareException('Middleware Error');
  }

  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyCustomer(req: any) {
    const obj = new MiddlewareFactory();
    return obj.checkToken(req.data, '1');
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyOrgUser(req: any) {
    const obj = new MiddlewareFactory();
    return obj.checkToken(req.data, '2');
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyGuest(req: any) {
    if (!req.data.recaptcha.error) {
      const obj = new MiddlewareFactory();
      return obj.checkToken(req.data, '0');
    } else {
      throw new MiddlewareException('Middleware Error!!');
    }
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyToken(req: any) {
    const obj = new MiddlewareFactory();
    return obj.checkToken(req.data, '1');
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyAuthorizationToken(req: any) {
    const obj = new MiddlewareFactory();
    return obj.verifyAuthorizationToken(req.data);
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyAdmin(req: any) {
    const obj = new MiddlewareFactory();
    return obj.checkToken(req.data, '61e79ce2f7146ffd75c72327');
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyRole(req: any) {
    const obj = new MiddlewareFactory();
    return obj.checkTokenAndPermission(req.data);
  }
  /**
   * @param {user} user
   * @param {expiryTime} expiryTime
   * @param {reset} reset
   * @return {Object}
   */
  async createToken(user: any, expiryTime: any, reset = false) {
    const obj = new MiddlewareFactory();
    return obj.generateToken(user, expiryTime, reset);
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async verifyBeneficiary(req: any) {
    const obj = new MiddlewareFactory();
    return obj.verifyBeneficiary(req.data);
  }
  /**
   * @param {req} req
   * @return {Object}
   */
  async loginOauth(req: any) {

  }
}
