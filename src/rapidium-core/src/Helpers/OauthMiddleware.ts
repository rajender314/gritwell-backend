import {PermissionScopeSchema}
  from '@basePath/Permissions/DataSource/Models/Schema/PermissionScopeSchema';
import {RoleSchema}
  from '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import {UserSchema}
  from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
const OAuth2Server = require('oauth2-server');
import AuthHelper from '@rapCoreHelpers/AuthHelper';
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
require('dotenv').config();
const tokenTime: any = process.env.TOKEN_TIME || 2;
let self: any;
/**
 * class OauthMiddleware
 */
export class OauthMiddleware {
  /**
   * constructor
   */
  constructor() {
    self = this;
  }
  /**
   * @param {req} req
   * @param {res} res
   */
  async generateToken(req, res) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/Model.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    req.body.grant_type = 'password';
    const userType = req.body.user_type ? req.body.user_type : 0;
    const offset = req.body.offset ? req.body.offset : '';
    const request = new Request(req);
    const response = new Response(res);

    return oauth
        .token(request, response)
        .then(async function(token) {
          const retdata: any = await self.checkLoginConditions(
              token,
              userType,
              offset,
          );
          return res.status(200).json(retdata);

          // let isEmailVerified = false;
          // await UserSchema.findOne({
          //   _id: token.user.user_id,
          // }).then(async (userInfo) => {
          //   if (userInfo && userInfo.is_email_verified) {
          //     isEmailVerified = true;
          //   }

          //   if(userType > 0 && userInfo){
          //     if(userType != userInfo.user_type){
          //       console.log("coming here-->",userType)
          //       const userobj: any = {};
          //       userobj.message =
          //        'Please enter valid username and/or password';
          //       userobj.status_code = 402;
          //       userobj.status = false;
          //       return res.status(200).json(userobj);
          //     }
          //   }
          // });

        // if (isEmailVerified) {
        //   if (token.user.user_id && req.body.offset) {
        //     await UserSchema.
        //       findByIdAndUpdate(token.user.user_id, { offset: req.body.offset });
        //   }
        //   const userobj: any = {};
        //   userobj.token = 'Bearer ' + token.accessToken;
        //   userobj.status_code = 200;
        //   userobj.status = true;
        //    res.status(200).json(userobj);
        // } else {
        //   const userobj: any = {};
        //   userobj.message = 'Your email is not verified. Please confirm your email using Resend Activation functionality';
        //   userobj.status_code = 402;
        //   userobj.status = false;
        //   res.status(200).json(userobj);
        // }
        })
        .catch(function(err) {
          const userobj: any = {};
          userobj.message = 'Please enter valid username and/or password';
          userobj.status_code = 402;
          userobj.status = false;
          res.status(200).json(userobj);
        });
  }

  /**
   *
   * @param {token} token
   * @param {userType} userType
   * @param {offset} offset
   * @return {Object}
   */
  async checkLoginConditions(token: any, userType: number, offset: string) {
    let isEmailVerified = false;
    return await UserSchema.findOne({
      _id: token.user.user_id,
    }).then(async (userInfo) => {
      if (userInfo && userInfo.is_email_verified) {
        isEmailVerified = true;
      }
      if (userType > 0 && userInfo) {
        if (userType != userInfo.user_type) {
          const userobj: any = {};
          userobj.message = 'Please enter valid username and/or password';
          userobj.status_code = 402;
          userobj.status = false;
          return userobj;
        }
      }
      if (isEmailVerified) {
        if (token.user.user_id && offset) {
          await UserSchema.findByIdAndUpdate(token.user.user_id, {
            offset: offset,
          });
        }
        const userobj: any = {};
        userobj.token = 'Bearer ' + token.accessToken;
        userobj.status_code = 200;
        userobj.status = true;
        return userobj;
      } else {
        const userobj: any = {};
        // eslint-disable-next-line
        userobj.message = 'Your email is not verified. Please confirm your email using Resend Activation functionality';
        userobj.status_code = 402;
        userobj.status = false;
        return userobj;
      }
    });
  }
  /**
   * @param {req} req
   * @param {res} res
   */
  async signupGenearateToken(req, res) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/Model.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    req.body.grant_type = 'password';
    const userType = req.body.user_type ? req.body.user_type : 0;
    const request = new Request(req);
    const response = new Response(res);
    return oauth
        .token(request, response)
        .then(async function(token) {
          let isUserTypeMatched = false;
          await UserSchema.findOne({
            _id: token.user.user_id,
          }).then(async (userInfo) => {
            if (userType > 0 && userInfo) {
              if (userType === userInfo.user_type) {
                isUserTypeMatched = true;
              }
            }
          });

          if (isUserTypeMatched) {
            const userobj: any = {};
            userobj.token = 'Bearer ' + token.accessToken;
            userobj.status_code = 200;
            userobj.status = true;
            res.status(200).json(userobj);
          } else {
            const userobj: any = {};
            userobj.message = 'Please enter valid username and/or password';
            userobj.status_code = 402;
            userobj.status = false;
            res.status(200).json(userobj);
          }
        })
        .catch(function(err) {
        // return false;
          const userobj: any = {};
          userobj.message = 'Please enter valid username and/or password';
          userobj.status_code = 402;
          userobj.status = false;
          res.status(200).json(userobj);
        });
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async checkToken(req, res, next) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/Model.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    const request = new Request(req);
    const response = new Response(res);

    return oauth
        .authenticate(request, response)
        .then(function(token) {
        // console.log(token);
          req['oauthVal'] = {token: token};
          next();
        })
        .catch(function(err) {
          res.status(err.code || 500).json(err);
        });
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async verifyAuthorizationToken(req, res, next) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/Model.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    const request = new Request(req);
    const response = new Response(res);

    return oauth
        .authenticate(request, response)
        .then(function(token) {
          req['oauthVal'] = {token: token};
          req['decoded'] = token.user;
          new AuthHelper().setValues(token.user);
          // const userInfo = new AuthHelper().getUserDetails();
          // console.log(117, userInfo);
          next();
        })
        .catch(function(err) {
          res.status(err.code || 500).json(err);
        });
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async verifyRole(req, res, next) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/Model.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    const request = new Request(req);
    const response = new Response(res);
    // const self = this;
    return oauth
        .authenticate(request, response)
        .then(async function(token) {
          req['oauthVal'] = {token: token};
          req['decoded'] = token.user;
          new AuthHelper().setValues(token.user);

          // const validateResource =
          // await self.validateResource(req, token.user);
          // if (!validateResource) {
          //   res
          //     .status(401)
          //     .send({
          //       status: false,
          //       status_code: 401,
          //       message: "Resource Forbidden",
          //     });
          // } else {
          //   next();
          // }

          next();
        })
        .catch(function(err) {
          err.status_code = err.statusCode;
          err.status = false;
          err.message = 'Access token is invalid';
          res.status(err.code || 500).json(err);
        });
  }

  /**
   * @param {req} req
   * @param {user} user
   */
  async validateResource(req, user) {
    console.log({
      route: req.route.path,
      method: req.method.toLowerCase(),
    });
    return PermissionScopeSchema.findOne({
      route: req.route.path,
      method: req.method.toLowerCase(),
    }).then((permissions) => {
      if (permissions != null) {
        return RoleSchema.findById(user.role_id).then((role) => {
          let permissionValue = 0;
          if (role != null) {
            if (role.permission[permissions.permission_id]) {
              permissionValue = role.permission[permissions.permission_id];
              if (!permissions.options_value.includes(permissionValue)) {
                return false;
              }
            } else {
              return false;
            }
            return true;
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    });
  }
  /**
   * @param {req} req
   * @param {res} res
   */
  async logout(req, res) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/Model.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    const request = new Request(req);
    const response = new Response(res);
    const val = await oauth.options.model.logOut(request, response);
    return res.json(val);
  }
  /**
   * @param {req} req
   * @param {res} res
   */
  async generateGuestToken(req, res) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/GuestTokenModel.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    req.body.grant_type = 'password';
    const request = new Request(req);
    const response = new Response(res);

    return oauth
        .token(request, response)
        .then(function(token) {
          const userobj: any = {};
          userobj.token = 'Bearer ' + token.accessToken;
          userobj.statusCode = 200;
          userobj.status = 200;
          res.status(200).json(userobj);
        })
        .catch(function(err) {
          res.status(err.code || 500).json(err);
        });
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async checkGuestToken(req, res, next) {
    const oauth = new OAuth2Server({
      model: require('@basePath/Middleware/DataSource/Mongo/GuestTokenModel.js'),
      accessTokenLifetime: tokenTime * 60 * 60,
      allowBearerTokensInQueryString: true,
    });
    const request = new Request(req);
    const response = new Response(res);

    return oauth
        .authenticate(request, response)
        .then(function(token) {
        // req['oauthVal'] = { token: token };
          next();
        })
        .catch(function(err) {
          res.status(err.code || 500).json(err);
        });
  }
}
