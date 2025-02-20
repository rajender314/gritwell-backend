import {JwtMiddleware} from '@src/rapidium-core/src/Helpers/JwtMiddleware';
import {OauthMiddleware} from '@src/rapidium-core/src/Helpers/OauthMiddleware';

require('dotenv').config();
const env = process.env;

let middlewareObj: any;
/**
 *class MiddlewareFactory
 */
export class MiddlewareFactory {
  /**
   * constructor
   */
  constructor() {
    const tokenType: string = env.TOKEN_TYPE ? env.TOKEN_TYPE : 'jwt';
    if (tokenType === 'jwt') {
      middlewareObj = new JwtMiddleware();
    } else {
      middlewareObj = new OauthMiddleware();
    }
  }
  /**
   * @param {user} user
   * @param {expiryTime} expiryTime
   * @param {reset} reset
   * @return {Object} Object
   */
  async generateToken2(user, expiryTime, reset) {
    return await middlewareObj
        .generateToken(user, expiryTime, reset)
        .then((result: any) => {
          return result;
        });
  }
  /**
  * @param {req} req
  * @param {res} res
  */
  async generateToken(req, res) {
    return await middlewareObj
        .generateToken(req, res)
        .then((result: any) => {
          return result;
        });
  }

 /**
  * @param {req} req
  * @param {res} res
  */
  async signupGenearateToken(req,res){
    return await middlewareObj
        .signupGenearateToken(req, res)
        .then((result: any) => {
          return result;
        });
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async verifyAuthorizationToken(req, res, next) {
    return middlewareObj.verifyAuthorizationToken(req, res, next);
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async checkToken(req, res, next) {
    return middlewareObj.checkToken(req, res, next);
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async verifyRole(req, res, next) {
    return middlewareObj.verifyRole(req, res, next);
  }

  /**
  * @param {req} req
  */
  async verifyBeneficiary(req: any) {
    return middlewareObj.verifyBeneficiary(req);
  }
  /**
  * @param {req} req
  * @param {res} res
  */
  async logout(req, res) {
    return await middlewareObj
        .logout(req, res)
        .then((result: any) => {
          return result;
        });
  }
  /**
  * @param {req} req
  * @param {res} res
  */
  async generateGuestToken(req, res) {
    return await middlewareObj
        .generateGuestToken(req, res)
        .then((result: any) => {
          return result;
        });
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async checkGuestToken(req, res, next) {
    return middlewareObj.checkGuestToken(req, res, next);
  }
}
