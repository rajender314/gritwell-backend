import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import User from '@basePath/Admin/DataSource/Models/User';
import {ResourceNotFound, ResourceRecordNotFound}
  from '@basePath/Exceptions/ResourceNotFound';
import bcrypt from 'bcrypt';
// import {MiddlewareFactory}
// from '@src/rapidium-core/src/Helpers/MiddlewareFactory';
import {ForgotTokenSchema}
  from '@basePath/Web/DataSource/Models/Schema/ForgotTokensSchema';
// import {now} from 'mongoose';
import ForgotTokens from '@basePath/Web/DataSource/Models/ForgotTokens';
// import {StrEncrypt} from '@basePath/Encrypt';
// import {OfficeUserSchema}
// from '@basePath/Admin/DataSource/Models/Schema/OfficeUserSchema';
// import {CustomerSchema}
// from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
// import {ObjectId} from '@rapCore/src/Mongodb/Types';
// import {SessionSchema}
// from '@basePath/Web/DataSource/Models/Schema/SessionSchema';
import LogsDataSource from '@basePath/Logs/DataSource/Mongo/LogsDataSource';
// import UserLog from '@basePath/Web/DataSource/Mongo/UserLog';
// import BaseHelper from '@rapCoreHelpers/BaseHelper';
// import jwt from 'jsonwebtoken';
// const environment = process.env;
/**
 * class LoginDataSource
 */
export default class LoginDataSource {
  /**
   * @param {data} data
   */
  async login(data: any) {
    // let logParams: any = {};
    // logParams.name = "Logging User";
    // logParams.table_name = "users";
    // logParams.action = "login api";
    // logParams.params = JSON.stringify(data);
    // try {
    //   let username = data.username;
    //   let password = data.password;
    //   return UserSchema
    // .findOne({ email: username, status: true }).then(async user => {
    //     if (user) {
    //       return await bcrypt
    //         .compare(password, user["password"])
    //         .then(match => {
    //           if (match) {
    //             let shemaName = OfficeUserSchema;
    //             if (user["user_type"] == 2) {
    //               shemaName = CustomerSchema;
    //             }
    //             return shemaName
    // .findOne({ user_id: ObjectId(user["_id"]) }).then(async user_data => {
    //               if (user_data) {
    //                 const payload = {
    //                   userId: user["_id"],
    //                   role: user["role_id"],
    //                   user_type: user["user_type"],
    //                   offset: data.offset ? data.offset : "-330",
    //                 };
    //                 let objMiddleware = new MiddlewareFactory();
    //                 const accessToken = await objMiddleware.generateToken(
    //                   payload,
    //                   process.env["expiryTime"],
    //                   false
    //                 );
    //                 //Update TimeZoneOffset for Login
    //                 await UserSchema.
    // findByIdAndUpdate(user["_id"], { offset: data.offset });
    //                 let users_obj = {
    //                   "id": user["_id"],
    //                   "user_type": user["user_type"],
    //                   "email": user["email"],
    //                   "status": user["status"],
    //                   "first_name": user_data["first_name"],
    //                   "last_name": user_data["last_name"],
    //                   "phone": user_data["phone"],
    //                   "img_file_name": user_data["img_file_name"],
    //                   "img_unique_name": user_data["img_unique_name"],
    //                   "user_id": user_data["user_id"],
    //                   "role_id": user_data["role_id"]
    //                 };
    //                 logParams.response = "Login user successull";
    //                 new LogsDataSource().addLog(logParams);
    //                 data.login_time = new BaseHelper().Date();
    //                 await new UserLog().log(users_obj, data);
    //                 return { token: accessToken };
    //               } else {
    //                 var error_msg = "Please contact administrator";
    //                 logParams.response = error_msg;
    //                 new LogsDataSource().addLog(logParams);
    //                 throw new ResourceRecordNotFound(
    // "Please enter valid username and/or password", "");
    //               }
    //             });
    //           } else {
    //             var error_msg =
    // "Please enter valid username and/or password";
    //             logParams.response = error_msg;
    //             new LogsDataSource().addLog(logParams);
    //             throw new ResourceRecordNotFound(error_msg, "");
    //           }
    //         });
    //     } else {
    //       var error_msg = "Please enter valid username and/or password";
    //       logParams.response = error_msg;
    //       new LogsDataSource().addLog(logParams);
    //       throw new ResourceRecordNotFound(error_msg, "");
    //     }
    //   });
    // } catch (err: any) {
    //   logParams.response = err.message;
    //   new LogsDataSource().addLog(logParams);
    //   throw new ResourceNotFound(
    // "Please enter valid username and/or password", "");
    // }
  }
  /**
   * @param {data} data
   */
  async forgotPassword(data: any) {
    return await new User(UserSchema).forgotPassword(data);
  }
  /**
   * @param {data} data
   */
  async verifyForgotToken(data: any) {
    const logParams: any = {};

    try {
      // const type = new StrEncrypt().decrypt(data.type);
      const tokenId = data.token_id;

      logParams.name = "Verify forgot password Token";
      logParams.table_name = "forgot_tokens";
      logParams.action = "VerifyForgotToken api";
      logParams.params = JSON.stringify(data);
      // console.log(tokenId);
      return ForgotTokenSchema.findOne({ _id: tokenId }).then(
        async (forgotToken) => {
          if (forgotToken) {
            return UserSchema.findOne({ email: forgotToken["email"] }).then(
              async (userDoc) => {
                if (userDoc && userDoc["is_password_updated"] == false) {
                  const response = {
                    username: userDoc["email"],
                    id: userDoc["id"],
                  };
                  logParams.response = "Token verification successful";
                  new LogsDataSource().addLog(logParams);
                  return response;
                } else if (userDoc && userDoc["is_password_updated"] == true) {
                  logParams.response = "Password is already updated";
                  new LogsDataSource().addLog(logParams);
                  throw new ResourceRecordNotFound(
                    "Password is already updated",
                    ""
                  );
                } else {
                  logParams.response = "User does not exists";
                  new LogsDataSource().addLog(logParams);
                  throw new ResourceRecordNotFound(
                    "User details not found",
                    ""
                  );
                }
              }
            );
          } else {
            logParams.response = "Forgot password token is expired";
            new LogsDataSource().addLog(logParams);
            throw new ResourceRecordNotFound(
              "The password reset link has expired," +
                "" +
                " please request for a new link",
              ""
            );
          }
        }
      );

      // if (type == "forgotUpdatepwd") {
      //   logParams.name = "Verify forgot password Token";
      //   logParams.table_name = "forgot_tokens";
      //   logParams.action = "VerifyForgotToken api";
      //   logParams.params = JSON.stringify(data);
      //   return ForgotTokenSchema
      // .findOne({ _id: tokenId }).then(async forgotToken => {
      //     if (forgotToken) {
      //       const response = {
      //         username: forgotToken["email"],
      //         id: forgotToken["id"]
      //       };
      //       logParams.response = "Token verification successful";
      //       new LogsDataSource().addLog(logParams);
      //       return response;
      //     } else {
      //       logParams.response = "Forgot password token is expired";
      //       new LogsDataSource().addLog(logParams);
      //       throw new ResourceRecordNotFound(
      // "The password reset link has expired,
      // please request for a new link", "");
      //     }
      //   });
      // } else if (type == "createUpdatepwd") {
      //   logParams.name = "Verify user exits for create password";
      //   logParams.table_name = "users";
      //   logParams.action = "VerifyForgotToken api";
      //   logParams.params = JSON.stringify(data);
      //   return UserSchema.findOne({ _id: tokenId }).then(async userDoc => {
      //     if (userDoc && userDoc["is_password_updated"] == false) {
      //       const response = {
      //         username: userDoc["email"],
      //         id: userDoc["id"]
      //       };
      //       logParams.response = "User verification successful";
      //       new LogsDataSource().addLog(logParams);
      //       return response;
      //     } else if (userDoc && userDoc["is_password_updated"] == true) {
      //       logParams.response = "Password is already created";
      //       new LogsDataSource().addLog(logParams);
      //       throw new ResourceRecordNotFound
      // ("Password is already created", "");
      //     } else {
      //       logParams.response = "User does not exists";
      //       new LogsDataSource().addLog(logParams);
      //       throw new ResourceRecordNotFound("User details not found", "");
      //     }
      //   });
      // } else {
      //   logParams.response =
      // "The password reset link has expired, please request for a new link";
      //   new LogsDataSource().addLog(logParams);
      //   throw new ResourceRecordNotFound("User does not exists", "");
      // }
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(
        "The password reset link has expired, please request for a new link",
        ""
      );
    }
  }
  /**
   * @param {data} data
   */
  async resetPassword(data: any) {
    const logParams: any = {};
    try {
      const tokenId = data.token_id;
      // const type = new StrEncrypt().decrypt(data.type);
      if (data.password == data.confirm_password) {
        logParams.name = "Reset password";
        logParams.table_name = "users";
        logParams.action = "ResetPassword api";
        logParams.params = JSON.stringify(data);
        return ForgotTokenSchema.findOne({ _id: tokenId }).then(
          async (forgotToken) => {
            if (forgotToken) {
              const resetPwdObj: any = {};
              resetPwdObj.id = forgotToken["user_id"];

              resetPwdObj.is_password_updated = true;
              resetPwdObj.is_email_verified = true;

              let user_doc = "";
              return UserSchema.findOne({ email: forgotToken["email"] }).then(
                async (userDoc) => {
                  if (userDoc) {
                    if (forgotToken["request_type"] === "verifyEmail") {
                      resetPwdObj.email_verified_at = new Date();
                      user_doc = await new User(UserSchema).verifyEmail(
                        resetPwdObj
                      );

                      logParams.response = "Email verified is successfully";
                      new LogsDataSource().addLog(logParams);
                    } else {
                      resetPwdObj.password = data.password;
                      const match = await bcrypt.compareSync(
                        data.password,
                        userDoc["password"]
                      );
                      if (match) {
                        throw new ResourceRecordNotFound(
                          "New password cannot be same as the current " +
                            " password." +
                            " Please try a different password",
                          ""
                        );
                      }

                      user_doc = await new User(UserSchema).addPwd(resetPwdObj);

                      logParams.response = "Reset password is done successful";
                      new LogsDataSource().addLog(logParams);
                    }

                    const deleteToken = { id: forgotToken["_id"] };
                    new ForgotTokens(ForgotTokenSchema).remove(deleteToken);
                    return user_doc;
                  } else {
                    throw new ResourceRecordNotFound(
                      "Something went wrong, Plaese try again later",
                      ""
                    );
                  }
                }
              );
            } else {
              logParams.response = "Forgot password token is expired";
              new LogsDataSource().addLog(logParams);
              throw new ResourceRecordNotFound(
                "The password reset link has expired," +
                  "" +
                  " please request for a new link",
                ""
              );
            }
          }
        );

        // if (type == "forgotUpdatepwd") {
        //   logParams.name = "Reset password";
        //   logParams.table_name = "users";
        //   logParams.action = "ResetPassword api";
        //   logParams.params = JSON.stringify(data);
        //   return ForgotTokenSchema
        // .findOne({ _id: tokenId }).then(async forgotToken => {
        //     if (forgotToken) {
        //       let reset_pwd_obj: any = {};
        //       reset_pwd_obj.id = forgotToken["user_id"];
        //       reset_pwd_obj.password = data.password;
        //       let user_doc =
        // await new User(UserSchema).addPwd(reset_pwd_obj);
        //       let delete_token = { 'id': forgotToken["_id"] };
        //       new ForgotTokens(ForgotTokenSchema).remove(delete_token);
        //       logParams.response = "Reset password is done successful";
        //       new LogsDataSource().addLog(logParams);
        //       return user_doc;
        //     } else {
        //       logParams.response = "Forgot password token is expired";
        //       new LogsDataSource().addLog(logParams);
        //       throw new ResourceRecordNotFound(
        // "The password reset link has expired,
        // please request for a new link", "");
        //     }
        //   });
        // } else if (type == "createUpdatepwd") {
        //   return UserSchema
        // .findOne({ _id: tokenId }).then(async userDoc => {
        //     if (userDoc) {
        //       let reset_pwd_obj: any = {};
        //       reset_pwd_obj.id = tokenId;
        //       reset_pwd_obj.password = data.password;
        //       reset_pwd_obj.is_password_updated = true;
        //       let user_doc =
        // await new User(UserSchema).addPwd(reset_pwd_obj);
        //       logParams.response =
        // "creating new password is done successful";
        //       new LogsDataSource().addLog(logParams);
        //       return user_doc;
        //     } else {
        //       logParams.response = "User does not exists";
        //       new LogsDataSource().addLog(logParams);
        //       throw new ResourceRecordNotFound("User details not found", "");
        //     }
        //   });
        // } else {
        //   logParams.response = "User does not exists";
        //   new LogsDataSource().addLog(logParams);
        //   throw new ResourceRecordNotFound("User details not found", "");
        // }
      } else {
        logParams.response = "New password and confirm password do not match";
        new LogsDataSource().addLog(logParams);
        throw new ResourceRecordNotFound(
          "New password and confirm password do not match",
          ""
        );
      }
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(err.message, "");
    }
    // return data;
  }
  /**
   * @param {data} data
   */
  async logout(data: any) {
    // const authorizationHeaader = data.headers.authorization;
    // return authorizationHeaader;
  }
}
