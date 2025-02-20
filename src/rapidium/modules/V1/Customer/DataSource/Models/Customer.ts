import BaseModel from '@rapCoreBase/Models/BaseModel';
import {AddCustomer} from '@basePath/Customer/Commands/AddCustomer';
import {Customer} from '@basePath/Customer/Commands/Customer';
import LogsDataSource from '@basePath/Logs/DataSource/Mongo/LogsDataSource';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
import {MailController} from '@basePath/EmailClass';
// import {StrEncrypt} from '@basePath/Encrypt';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {EmailTemplateSchema}
  from '@rapCore/src/Base/Mailer/EmailTemplateSchema';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import {CustomerMaskIdGenerator}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerMaskIdGenerator';
import moment from 'moment-timezone';
import * as bcrypt from 'bcrypt';
import {ForgotTokenSchema}
  from '@basePath/Web/DataSource/Models/Schema/ForgotTokensSchema';
import ForgotTokens from '@basePath/Web/DataSource/Models/ForgotTokens';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {GetClientDetails}
  from '@basePath/OfficeClients/Commands/GetClientDetails';
// import {MiddlewareFactory}
//   from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const environment = process.env;
/**
 * DataSource for Customers
 */
export default class Customers extends BaseModel {
  private modelDs: any;
  /**
   * @param {ModelName} ModelName
   */
  constructor(ModelName: any) {
    super(ModelName);
    this.modelDs = ModelName;
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async create(data: AddCustomer) {
    // const url = '';
    const logParams: any = {};
    logParams.name = 'Creating new Customer';
    logParams.table_name = 'users';
    logParams.action = 'create user api';
    logParams.params = JSON.stringify(data);
    try {
      return UserSchema.findOne({email: data.email}).then(async (user) => {
        if (user) {
          // return user;
          let createCustomerObj: any = {};
          createCustomerObj = {
            'first_name': data.first_name,
            'last_name': data.last_name,
            'phone': data.phone,
            'img_file_name': data.img_file_name,
            'img_unique_name': data.img_unique_name,
            'address': data.address,
            'state': data.state,
            'dob': data.dob,
            'ethnicity': data.ethnicity,
            'gender': data.gender,
            'height': data.height,
            'weight': data.weight,
            'status': data.status,
          };
          await UserSchema.findByIdAndUpdate(
              user._id,
              {
                'first_name': data.first_name,
                'last_name': data.last_name,
                'status': data.status,
              },
          );

          await CustomerSchema.findOneAndUpdate(
              {user_id: user._id},
              createCustomerObj,
          );
          return user;
        } else {
          const createUserObj = {
            'id': data.id,
            'email': data.email,
            'first_name': data.first_name,
            'last_name': data.last_name,
            'password': data.password,
            'is_password_updated': data.is_password_updated,
            'role_id': ObjectId(data.role_id),
            'is_admin': data.is_admin,
            'user_type': data.user_type,
            'status': data.status,
          };
          const createUser = await this.addUpdate(createUserObj);
          let createCustomerObj: any = {};
          createCustomerObj = {
            'first_name': data.first_name,
            'last_name': data.last_name,
            'phone': data.phone,
            'img_file_name': data.img_file_name,
            'img_unique_name': data.img_unique_name,
            'address': data.address,
            'state': data.state,
            'dob': data.dob,
            'ethnicity': data.ethnicity,
            'gender': data.gender,
            'height': data.height,
            'weight': data.weight,
          };
          if (!data.id && data.email && createUser._id) {
            createCustomerObj.user_id = ObjectId(createUser._id);
            const customerData: any =
              await CustomerSchema.create(createCustomerObj);
            if (customerData && customerData.user_id !== null) {
              const gwcClientId = await this.customerMaskIdGenerator();
              await CustomerSchema.findOneAndUpdate(
                  {user_id: customerData.user_id},
                  {gwc_client_id: gwcClientId},
              );
            }
            logParams.response = 'Creating new Customer is done successfully';


            /* const salt = bcrypt.genSaltSync(10);
            const tokenId = bcrypt.hashSync(data.email, salt);
            let fwdobj: any = {};

            fwdobj = {
              email: data.email,
              token_id: tokenId,
              user_id: customerData.user_id,
              request_type:
                data.req_type === 'clientUser' ?
                  'verifyEmail' :
                  'recoverypassword',
            };

            const tokenDoc = await new ForgotTokens(ForgotTokenSchema).create(
                fwdobj,
            );
            const displayName = data.first_name + ' ' + data.last_name;
            if (data.req_type === 'clientUser') {
              const str = tokenDoc._id;
              // const str = createUser._id;
              url = environment.pwa_base_url + 'verifyemail/' + str;
              this.sendCreateUserMail(
                  data.email,
                  url,
                  'verify_email',
                  displayName,
                  '',
              );
            } else {

              const str = tokenDoc._id;
              url = environment.web_base_url + 'recoverypassword/' + str;
              this.sendCreateUserMail(
                  data.email,
                  url,
                  'customer_create_password',
                  displayName,
                  '',
              );
            }*/

            new LogsDataSource().addLog(logParams);

            return createUser;
          } else {
            const customerUserData = await CustomerSchema.findOneAndUpdate(
                {user_id: data.id},
                createCustomerObj,
            );
            logParams.response = 'Updating Customer is done successfully';
            new LogsDataSource().addLog(logParams);
            return customerUserData;
          }
        }
      });
      // return createUser;
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async update(data: Customer) {
    const createUser = await this.addUpdate(data);
    return createUser;
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public async remove(data: any) {
    return this.deleteOne(data);
  }
  /**
 * @param {email} email
 * @param {url} url
 * @param {template} template
 * @param {displayName} displayName
 * @param {bodyMessage} bodyMessage
 */
  public sendCreateUserMail(
      email: string,
      url: string,
      template: string,
      displayName: string,
      bodyMessage: string) {
    EmailTemplateSchema.findOne(
        {db_name: template, status: true},
    ).then(async (emailTemplate: any) => {
      const siteUrl = environment.web_base_url;
      const apiUrl = environment.api_base_url;

      const logo = apiUrl + 'uploads/logos/logo.png';
      const fbIcon = apiUrl + 'uploads/logos/facebook.png';
      const instagramIcon = apiUrl + 'uploads/logos/instagram.png';
      const linkedinIcon = apiUrl + 'uploads/logos/linkedIn.png';

      let htmlText = '';
      emailTemplate.body = emailTemplate.body.replace('{{url}}', url);
      emailTemplate.body =
        emailTemplate.body.replace('{{body_message}}', bodyMessage);

      emailTemplate.body = emailTemplate.body.replace('{{site_url}}', siteUrl);
      emailTemplate.body = emailTemplate.body.replace('{{logo}}', logo);
      emailTemplate.body = emailTemplate.body.replace('{{fb_icon}}', fbIcon);
      emailTemplate.body =
        emailTemplate.body.replace('{{instagram_icon}}', instagramIcon);
      emailTemplate.body =
        emailTemplate.body.replace('{{linkedin_icon}}', linkedinIcon);
      emailTemplate.body = emailTemplate.body.replace('{{email}}', email);
      htmlText = emailTemplate.body.replace('{{display_name}}', displayName);

      const HelperOptions = {
        from: emailTemplate.from_email,
        to: email,
        subject: emailTemplate.subject,
        html: htmlText,
      };
      new MailController().transport(HelperOptions);
    });
  }
  /**
 *
 * @param {template} template
 * @return {Object}
 */
  public getEmailTemplate(template: string) {
    return EmailTemplateSchema.findOne(
        {db_name: template, status: true},
    ).then(async (emailTemplate) => {
      return emailTemplate;
    });
  }
  /**
 * @return {Object}
 */
  async customerMaskIdGenerator() {
    const lastMaskId = 0;
    const customerMaskData: any = await CustomerMaskIdGenerator.findOne({});
    if (customerMaskData &&
      customerMaskData._id !== null &&
      customerMaskData.mask_id !== null) {
      const maskId: number = customerMaskData.mask_id + (lastMaskId + 1);
      return await CustomerMaskIdGenerator.findByIdAndUpdate(
          customerMaskData._id,
          {mask_id: maskId},
          {new: true},
      )
          .then((mask: any) => {
          // eslint-disable-next-line
          return `GWC${moment().format("YY")}${moment().format("MM")}${
              mask.mask_id
            }`;
          })
          .catch((error: any) => {
            return error;
          });
    }
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  async customerReSendEmailVerificationLink(data: any) {
    const logParams: any = {};
    logParams.name = 'Customer ReSend Email Verification';
    logParams.table_name = 'users';
    logParams.action = 'customerReSendEmailVerificationLink';
    logParams.params = JSON.stringify(data);
    try {
      return UserSchema.findOne({email: data.email, user_type: 2}).then(
          async (user) => {
            if (user && !user.is_email_verified) {
              const userCommand = new GetClientDetails({
                params: {id: user._id},
              });
              const customerInfo = await new CommandFactory().getCommand(
                  userCommand.path,
                  true,
                  userCommand,
              );

              const salt = bcrypt.genSaltSync(10);
              const tokenId = bcrypt.hashSync(data.email, salt);
              let fwdobj: any = {};

              fwdobj = {
                email: data.email,
                token_id: tokenId,
                user_id: user._id,
                request_type: 'verifyEmail',
              };
              const displayName =
              customerInfo.first_name + ' ' + customerInfo.last_name;
              const tokenDoc = await new ForgotTokens(ForgotTokenSchema).create(
                  fwdobj,
              );
              const str = tokenDoc._id;
              const url = environment.pwa_base_url + 'verifyemail/' + str;
              this.sendCreateUserMail(
                  data.email,
                  url,
                  're_send_email_verify',
                  displayName,
                  '',
              );
              logParams.response = 'Email send successfully';
              new LogsDataSource().addLog(logParams);
              return 'Email send successfully';
            } else if (user && user.is_email_verified) {
              logParams.response = 'Email already verified';
              new LogsDataSource().addLog(logParams);
              throw new ResourceNotFound('Email already verified', '');
            } else {
              logParams.response = 'Email not found';
              new LogsDataSource().addLog(logParams);
              throw new ResourceNotFound('Email not found', '');
            }
          },
      );
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(err.message, '');
    }
  }
}
