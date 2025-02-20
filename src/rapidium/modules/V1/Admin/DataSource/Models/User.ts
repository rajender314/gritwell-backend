import BaseModel from '@rapCoreBase/Models/BaseModel';
import {AddUser} from '@basePath/Admin/Commands/AddUser';
import {EditUser} from '@basePath/Admin/Commands/EditUser';
import {GetUser} from '@basePath/Admin/Commands/GetUser';
import {MailController} from '@basePath/EmailClass';
import {StrEncrypt} from '@basePath/Encrypt';
import * as bcrypt from 'bcrypt';
import {ForgotTokenSchema}
  from '@basePath/Web/DataSource/Models/Schema/ForgotTokensSchema';
import ForgotTokens from '@basePath/Web/DataSource/Models/ForgotTokens';
import {OfficeUserSchema}
  from '@basePath/Admin/DataSource/Models/Schema/OfficeUserSchema';
import {
  ResourceNotFound,
  ResourceRecordNotFound,
} from '@basePath/Exceptions/ResourceNotFound';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import LogsDataSource from '@basePath/Logs/DataSource/Mongo/LogsDataSource';
import {EmailTemplateSchema}
  from '@rapCore/src/Base/Mailer/EmailTemplateSchema';
import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
import {SaveEmailDetails} from '@basePath/Settings/Commands/SaveEmailDetails';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {VerifyAuthorizationToken}
  from '@basePath/Middleware/Commands/VerifyAuthorizationToken';
const environment = process.env;
/**
 * class Users
 */
export default class Users extends BaseModel {
  private modelDs: any;
  /**
   * constructor
   * @param {ModelName} ModelName
   */
  constructor(ModelName: any) {
    super(ModelName);
    this.modelDs = ModelName;
  }
  /**
   * addPwd
   * @param {data} data
   * @return {Object}
   */
  public async addPwd(data: any) {
    if (data.password) {
      return await this.modelDs.findById(data.id).then(async (doc: object) => {
        if (doc) {
          const salt = bcrypt.genSaltSync(10);
          data.password = bcrypt.hashSync(data.password, salt);
          const updatePwd = await this.addUpdate(data);
          return updatePwd;
        }
      });
    }
  }
  /**
   * verifyEmail
   * @param {data} data
   * @return {Object}
   */
  public async verifyEmail(data: any) {
    return await this.modelDs.findById(data.id).then(async (doc: object) => {
      if (doc) {
        const emailVerify = await this.addUpdate(data);
        return emailVerify;
      }
    });
  }
  /**
   * create
   * @param {data} data
   * @return {Object}
   */
  public async create(data: AddUser) {
    let url = '';
    // const officeUserData = {};
    const logParams: any = {};
    logParams.name = 'Creating new user';
    logParams.table_name = 'users';
    logParams.action = 'create user api';
    logParams.params = JSON.stringify(data);
    try {
      const createUserObj = {
        id: data.id,
        email: data.email,
        password: data.password,
        is_password_updated: data.is_password_updated,
        user_type: data.user_type,
        status: data.status,
      };
      const createUser = await this.addUpdate(createUserObj);
      let createOfficeUserObj: any = {};
      createOfficeUserObj = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        role_id: ObjectId(data.role_id),
        img_file_name: data.img_file_name,
        img_unique_name: data.img_unique_name,
        is_admin: data.is_admin,
      };

      if (!data.id && data.email && createUser._id) {
        createOfficeUserObj.user_id = ObjectId(createUser._id);
        const officeUserData = await OfficeUserSchema.create(
            createOfficeUserObj,
        );
        logParams.response = 'Creating new user is done successfully';

        const salt = bcrypt.genSaltSync(10);
        const tokenId = bcrypt.hashSync(data.email, salt);
        let fwdobj: any = {};

        fwdobj = {
          email: data.email,
          token_id: tokenId,
          user_id: createUser._id,
          request_type: 'createUpdatepwd',
        };

        const tokenDoc = await new ForgotTokens(ForgotTokenSchema).create(
            fwdobj,
        );

        const type = new StrEncrypt().encrypt('createUpdatepwd');
        const str = tokenDoc._id + '/' + type;
        url = environment.web_base_url + 'recoverypassword/' + str;
        const displayName = data.first_name + ' ' + data.last_name;
        this.sendCreateUserMail(
            data.email,
            url,
            'create_password',
            displayName,
        );
        new LogsDataSource().addLog(logParams);

        const usersObj = {
          id: createUser['_id'],
          user_type: createUser['user_type'],
          email: createUser['email'],
          status: createUser['status'],
          first_name: officeUserData['first_name'],
          last_name: officeUserData['last_name'],
          phone: officeUserData['phone'],
          img_file_name: officeUserData['img_file_name'],
          img_unique_name: officeUserData['img_unique_name'],
          user_id: officeUserData['user_id'],
          role_id: officeUserData['role_id'],
          display_url: officeUserData['img_unique_name'] ?
            environment.api_base_url + officeUserData['img_unique_name'] :
            '',
        };

        return usersObj;
      } else {
        const officeUserData = await OfficeUserSchema.findOneAndUpdate(
            {user_id: data.id},
            createOfficeUserObj,
        );
        logParams.response = 'Updating user is done successfully';
        new LogsDataSource().addLog(logParams);
        return officeUserData;
      }
      // return createUser;
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
   * update
   * @param {data} data
   * @return {Object}
   */
  public async update(data: EditUser) {
    // const url = '';
    // const officeUserData = {};
    const logParams: any = {};
    logParams.name = 'Updating user';
    logParams.table_name = 'users';
    logParams.action = 'update user api';
    logParams.params = JSON.stringify(data);
    try {
      const createUserObj = {
        id: data.id,
        email: data.email,
        status: data.status,
      };
      const createUser = await this.addUpdate(createUserObj);
      let createOfficeUserObj: any = {};
      createOfficeUserObj = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        role_id: ObjectId(data.role_id),
        img_file_name: data.img_file_name,
        img_unique_name: data.img_unique_name,
        is_admin: data.is_admin,
      };

      // const officeUserData: any = await OfficeUserSchema.findOneAndUpdate(
      await OfficeUserSchema.findOneAndUpdate(
          {user_id: data.id},
          createOfficeUserObj,
      );
      logParams.response = 'Updating user is done successfully';
      new LogsDataSource().addLog(logParams);
      const displayUrl = createOfficeUserObj['img_unique_name'] ?
        environment.api_base_url + createOfficeUserObj['img_unique_name'] :
        '';
      createOfficeUserObj = Object.assign(createOfficeUserObj, {
        id: data.id,
        user_type: createUser['user_type'],
        email: createUser['email'],
        status: createUser['status'],
        display_url: displayUrl,
      });

      return {user_data: createOfficeUserObj};
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
   * remove
   * @param {data} data
   * @return {Object}
   */
  public async remove(data: any) {
    return this.deleteOne(data);
  }
  /**
   * get
   * @param {data} data
   * @return {Object}
   */
  public get(data: GetUser) {
    if (data.id) {
      return this.getOne(data);
    } else {
      let query = {};
      if (data.search) {
        query = {
          $or: [
            {first_name: new RegExp(data.search, 'i')},
            {last_name: new RegExp(data.search, 'i')},
            {email: new RegExp(data.search, 'i')},
          ],
        };
        // query['first_name'] = new RegExp(data.search,"i");
        // query['last_name'] = new RegExp(data.search,"i");
      }
      const options = {
        sort: {[data.column]: data.sort},
        page: data.page,
        limit: data.perPage,
      };
      return (
        this.modelDs
        // .find(query)
            .paginate(query, options)
            .then(async (docs: object) => {
              if (docs) {
                return docs;
              } else {
                return 'No Records Found';
              }
            })
            .catch((error: any) => {
              return error;
            })
      );
    }
  }
  /**
   * forgotPassword
   * @param {data} data
   * @return {Object}
   */
  public forgotPassword(data: any) {
    try {
      const query = {};
      const updateFp: any = {};
      const logParams: any = {};
      logParams.name = 'Forgot Password';
      logParams.table_name = 'users';
      logParams.action = 'forgotPassword api';
      logParams.params = JSON.stringify(data);
      let response = '';
      query['email'] = data.email;
      if (!data.admin_reset_password) {
        query['status'] = true;
      }
      return this.modelDs
          .find(query)
          .then(async (doc: object) => {
            if (doc && Object.keys(doc).length !== 0) {
              if (data.admin_reset_password && !doc[0].status) {
                const errorMsg =
                'Inactive users cannot change password. Please activate user to send password reset link';
                logParams.response = errorMsg;
                new LogsDataSource().addLog(logParams);
                return {message: errorMsg};
              }

              data.id = doc[0]._id;
              updateFp.id = doc[0]._id;
              updateFp.is_password_updated = data.is_password_updated;

              this.addUpdate(updateFp);
              const salt = bcrypt.genSaltSync(10);
              const tokenId = bcrypt.hashSync(doc[0].email, salt);
              let fwdobj: any = {};

              fwdobj = {
                email: doc[0].email,
                token_id: tokenId,
                user_id: doc[0]._id,
                request_type: 'forgotUpdatepwd',
              };

              const tokenDoc = await new ForgotTokens(ForgotTokenSchema).create(
                  fwdobj,
              );
              response = 'Generating token';

              response = response.concat(
                  ' - ',
                  'Sending Forgot password token email',
              );
              const type = new StrEncrypt().encrypt('forgotUpdatepwd');
              const str = tokenDoc._id + '/' + type;
              let baseUrl = environment.web_base_url;
              if (doc[0].user_type == 2) {
                baseUrl = environment.pwa_base_url;
              }
              const url = baseUrl + 'recoverypassword/' + str;
              logParams.response = response;
              new LogsDataSource().addLog(logParams);
              let templateName = 'forgot_password';
              if (data.admin_reset_password) {
                templateName = 'admin_reset_password';
              } else if (doc[0].user_type == 2) {
                templateName = 'customer_forgot_password';
              }

              let displayName = '';
              if (doc[0].user_type == 2) {
                await CustomerSchema.findOne({user_id: doc[0]._id}).then(
                    async (userDetails: any) => {
                      displayName =
                    userDetails.first_name + ' ' + userDetails.last_name;
                    },
                );
              } else {
                await OfficeUserSchema.findOne({user_id: doc[0]._id}).then(
                    async (userDetails: any) => {
                      displayName =
                    userDetails.first_name + ' ' + userDetails.last_name;
                    },
                );
              }

              this.sendCreateUserMail(
                  doc[0].email,
                  url,
                  templateName,
                  displayName,
              );
              // return tokenDoc;
              return {
                message:
                'An email with the reset link has been sent to registered email address',
              };
            } else {
              const errorMsg = 'Email id is not registered with us';
              logParams.response = errorMsg;
              new LogsDataSource().addLog(logParams);
              throw new ResourceRecordNotFound(errorMsg, '');
            }
          })
          .catch((error: any) => {
            logParams.response = error.message;
            new LogsDataSource().addLog(logParams);
            throw new ResourceNotFound('Email id is not registered with us', '');
          });
    } catch (err: any) {
      throw new ResourceNotFound(
          'Some thing went wrong, Please try again later',
          '',
      );
    }
  }
  /**
   * changePassword
   * @param {data} data
   * @return {Object}
   */
  async changePassword(data: any) {
    const tokenCommand = new VerifyAuthorizationToken(data);
    const tokenData = await new CommandFactory().getCommand(
        tokenCommand.path,
        true,
        tokenCommand,
    );
    const userId = tokenData.userId;

    if (data.oldPassword !== data.password) {
      if (data.password === data.confirmPassword) {
        return this.modelDs
            .findById(userId)
            .then(async (doc: object) => {
              if (doc) {
                const match = await bcrypt.compareSync(
                    data.oldPassword,
                    doc['password'],
                );
                if (match) {
                  const salt = bcrypt.genSaltSync(10);
                  data.password = bcrypt.hashSync(data.password, salt);
                  data.id = userId;
                  this.addUpdate(data);
                  return {message: 'Your password has been updated'};
                } else {
                  throw new ResourceRecordNotFound(
                      'Old password is not correct',
                      '',
                  );
                }
              } else {
                throw new ResourceRecordNotFound(
                    'Something went wrong, Plaese try again later',
                    '',
                );
              }
            })
            .catch((error: any) => {
              throw new ResourceRecordNotFound('Old password is not correct', '');
            });
      } else {
        throw new ResourceRecordNotFound(
            'New password and confirm password do not match',
            '',
        );
      }
    } else {
      throw new ResourceRecordNotFound(
          'New password cannot be same as the current password. Please try a different password',
          '',
      );
    }
  }
  /**
   * sendCreateUserMail
   * @param {email} email
   * @param {url} url
   * @param {template} template
   * @param {displayName} displayName
   */
  public sendCreateUserMail(
      email: string,
      url: string,
      template: string,
      displayName: string,
  ) {
    EmailTemplateSchema.findOne({db_name: template, status: true}).then(
        async (emailTemplate: any) => {
          const siteUrl = environment.web_base_url;
          const apiUrl = environment.api_base_url;

          const logo = apiUrl + 'uploads/logos/logo.png';
          const fbIcon = apiUrl + 'uploads/logos/facebook.png';
          const instagramIcon = apiUrl + 'uploads/logos/instagram.png';
          const linkedinIcon = apiUrl + 'uploads/logos/linkedIn.png';

          let htmlText = '';
          emailTemplate.body = emailTemplate.body.replace('{{url}}', url);

          emailTemplate.body = emailTemplate.body.replace(
              '{{site_url}}',
              siteUrl,
          );
          emailTemplate.body = emailTemplate.body.replace('{{logo}}', logo);
          emailTemplate.body = emailTemplate.body.replace('{{fb_icon}}', fbIcon);
          emailTemplate.body = emailTemplate.body.replace(
              '{{instagram_icon}}',
              instagramIcon,
          );
          emailTemplate.body = emailTemplate.body.replace(
              '{{linkedin_icon}}',
              linkedinIcon,
          );
          emailTemplate.body = emailTemplate.body.replace('{{email}}', email);
          htmlText = emailTemplate.body.replace('{{display_name}}', displayName);

          const HelperOptions = {
            from: emailTemplate.from_email,
            to: email,
            subject: emailTemplate.subject,
            html: htmlText,
          };

          // Saving Email Info
          const command = new SaveEmailDetails(HelperOptions);
          await new CommandFactory().getCommand(command.path, true, command);

          new MailController().transport(HelperOptions);
        },
    );
  }
  /**
   * pwdUpdateMail
   * @param {data} data
   */
  public pwdUpdateMail(data: any) {
    const HelperOptions = {
      from: 'finegems@gmail.com',
      to: data.email,
      subject: 'Password update successfully ',
      text: 'password has been successfully updated',
    };
    new MailController().transport(HelperOptions);
    // const schema = new MailController().transport(HelperOptions);
  }
  /**
   * getEmailTemplate
   * @param {template} template
   * @return {Object}
   */
  public getEmailTemplate(template: string) {
    return EmailTemplateSchema.findOne({
      db_name: template,
      status: true,
    }).then(async (emailTemplate) => {
      return emailTemplate;
    });
  }
  /**
   * htmlText
   * @param {url} url
   * @param {from} from
   * @return {Object}
   */
  public htmlText(url: any, from: string) {
    if (from == 'createUser') {
      return `<html> <head></head> 
        <style> 
        .body-container{ 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
        } .mb-0{ margin-bottom: 0; } .m-0{ margin: 0; } 
        </style> 
        <body class="body-container">
          <h3>Welcome to Grit-well!</h3>
           <p>You have successfully created your Grit-well account. 
           You may log in using the email address and password provided at the URL given below.</p>
            <a href="${url}" target="_blank">Click here</a> 
            <p class="mb-0">Thank you,</p> 
            <h3 class="m-0">Grit-well</h3> 
            </body> </html>`;
    } else {
      return `<html><head></head> 
      <style> 
       .body-container{ 
         display: flex; 
         flex-direction: column; 
         align-items: center; 
         justify-content: center; 
        } .mb-0{ margin-bottom: 0; } .m-0{ margin: 0; } 
         </style>
       <body class="body-container">
            <h3>Hi</h3> 
            <p>
            We have received a  password change request for your account in Grit-well Application.
             To reset your password, click on the link below.</p> 
            <a href="${url}" target="_blank">Change your password</a>
            <p> If you did not request to change your password, please ignore this email.</p>
             <p class="mb-0">Thank you,</p> 
             <h3 class="m-0">Grit-well</h3> 
         </body> 
         </html>`;
    }
  }
}
