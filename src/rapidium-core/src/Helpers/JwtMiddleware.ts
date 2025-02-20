import * as jwt from 'jsonwebtoken';
import {MiddlewareException} from '@rapCoreBase/Exceptions/MiddlewareException';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {VerifyBeneficiary} from '@rapCoreBase/Commands/VerifyBeneficiary';
import AuthHelper from '@rapCoreHelpers/AuthHelper';
import {RoleSchema} from '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import {PermissionScopeSchema}
  from '@basePath/Permissions/DataSource/Models/Schema/PermissionScopeSchema';

require('dotenv').config();
const env = process.env;
/**
 * class JwtMiddleware
 */
export class JwtMiddleware {
  /**
    * @param {user} user
   * @param {expiryTime} expiryTime
   * @param {reset} reset
   * @return {Object}
   */
  async generateToken(user, expiryTime, reset = false) {
    const secretKey: any = reset ? env.RESET_JWT_SECRET : env.JWT_SECRET;
    return jwt.sign(user, secretKey, {expiresIn: expiryTime});
  }
  /**
 * @param {req} req
 * @param {roleId} roleId
 * @return {Object}
 */
  async checkToken(req: any, roleId: string) {
    const secret: any = req.body.resetPassword ?
      process.env['RESET_JWT_SECRET'] :
      process.env['JWT_SECRET'];

    const authorizationHeader = req.headers.authorization;
    let result = {};

    if (authorizationHeader) {
      return jwt.verify(
          authorizationHeader,
          secret,
          function(err: any, decoded: any) {
            if (err) {
              throw new MiddlewareException(
                  'Authentication Token required.', 403,
              );
            }
            new AuthHelper().setValues(decoded);
            if (decoded.role === roleId) {
              result = decoded;
              return {isMiddlewarePassed: true, decoded: result};
            } else {
              throw new MiddlewareException(
                  'You Don’t Have Permission to Access.',
              );
            }
          },
      );
    } else {
      throw new MiddlewareException(
          'Authentication Token required.', 403,
      );
    }
  }

  /**
 * @param {req} req
 * @return {Object}
 */
  async verifyAuthorizationToken(req: any) {
    const secret: any = process.env['JWT_SECRET'];
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      return jwt.verify(
          authorizationHeader,
          secret,
          function(err: any, user: any) {
            if (err) {
              throw new MiddlewareException(
                  'Authentication Token required.', 403,
              );
            }
            // return user
            return {isMiddlewarePassed: true, decoded: user};
          },
      );
    } else {
      throw new MiddlewareException('Authentication Token required.', 403);
    }
  }
  /**
 * @param {req} req
 * @return {Object}
 */
  async checkTokenAndPermission(req: any) {
    const secret: any = process.env['JWT_SECRET'];
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      return jwt.verify(
          authorizationHeader,
          secret,
          function(err: any, decoded: any) {
            if (err) {
              throw new MiddlewareException(
                  'Authentication Token required.', 403,
              );
            }
            return {isMiddlewarePassed: true, decoded: decoded};
            return PermissionScopeSchema
                .find(
                    {
                      'route': req.route.path,
                      'method': req.method.toLowerCase(),
                    })
                .then((permissions: any) => {
                  const permissionsData: any = [];
                  const pData: any = {};
                  if (permissions) {
                    permissions.map((permission, i) => {
                      permissionsData.push(permission.options_value);
                      pData[permission.permission_id] = permissionsData;
                    });
                    return RoleSchema
                        .findOne({_id: decoded.role})
                        .then((role: any) => {
                          const userP: any = Object.values(pData)[0];
                          const pId: any =
                  parseInt(role.permission[Object.keys(pData)[0]]);
                          if (!userP.includes(pId)) {
                            throw new MiddlewareException(
                                'Resource Forbidden.', 401,
                            );
                          }
                          return {isMiddlewarePassed: true, decoded: decoded};
                        });
                  } else {
                    throw new MiddlewareException(
                        'Resource Forbidden.', 401,
                    );
                  }
                });
          },
      );
    } else {
      throw new MiddlewareException('Authentication Token required.', 403);
    }
  }
  /**
 * @param {req} req
 * @return {Object}
 */
  async verifyBeneficiary(req: any) {
    let custId = '';
    let custBId = '';
    try {
      if (
        typeof req.body.customers_beneficiaries_id == 'string' ||
        typeof req.body.customer_beneficiary_id == 'string' ||
        typeof req.query.customer_beneficiary_id == 'string'
      ) {
        if (req.body.customers_beneficiaries_id) {
          custBId = req.body.customers_beneficiaries_id;
        } else if (req.body.customer_beneficiary_id) {
          custBId = req.body.customer_beneficiary_id;
        } else if (req.query.customer_beneficiary_id) {
          custBId = req.query.customer_beneficiary_id;
        }
        req.body.custBId = custBId;

        const secret: any = req.body.resetPassword ?
          process.env['RESET_JWT_SECRET'] :
          process.env['JWT_SECRET'];

        const authorizationHeaader = req.headers.authorization;
        if (authorizationHeaader) {
          try {
            jwt.verify(
                authorizationHeaader,
                secret,
                function(err: any, decoded: any) {
                  if (decoded) {
                    custId = decoded.customerId;
                  }
                },
            );
          } catch (err) { }
        }

        req.body.custId = custId;

        if (custId) {
          const command = new VerifyBeneficiary(req);
          const cmndFactory = new CommandFactory();
          const finalResult = await cmndFactory.getCommand(
              command.path,
              true,
              command,
          );

          if (finalResult) {
            return {isMiddlewarePassed: true};
          } else {
            throw new MiddlewareException('Not Authorised!!');
          }
        } else {
          throw new MiddlewareException('Not Authorised!!');
        }
      } else {
        throw new MiddlewareException('Invalid inputs');
      }
    } catch (err) {
      throw new MiddlewareException('Invalid inputs');
    }
  }
}
