import Customer from '@basePath/Customer/DataSource/Models/Customer';
import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import * as bcrypt from 'bcrypt';
import {Appointments} from '@basePath/Customer/Commands/Appointments';
import {ValidateAppointment}
  from '@basePath/Customer/Commands/ValidateAppointment';
import {AppointmentPayment}
  from '@basePath/Customer/Commands/AppointmentPayment';
import {ClientAppointments}
  from '@basePath/OfficeClients/Commands/ClientAppointments';
import {IntakeForm} from '@basePath/Customer/Commands/IntakeForm';
// import {TypeForm} from '@basePath/OfficeClients/Commands/TypeForm';
import {SymptomAnalysis} from '@basePath/Customer/Commands/SymptomAnalysis';
import {MyPhasesOfCare} from '@basePath/Customer/Commands/MyPhasesOfCare';
import {GetHealthPlan} from '@basePath/HealthPlan/Commands/GetHealthPlan';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import AcuityOperations
  from '@basePath/Acuity/DataSource/Models/AcuityOperations';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {ClientDocument} from '@basePath/Documents/Commands/ClientDocument';
// import {date} from '@hapi/joi';
const environment = process.env;
import LogsDataSource from '@basePath/Logs/DataSource/Mongo/LogsDataSource';
import StripeOperations
  from '@basePath/Subscriptions/DataSource/Models/StripeOperations';
// eslint-disable-next-line
import SubscriptionsDataSource from '@basePath/Subscriptions/DataSource/Mongo/SubscriptionsDataSource';
// eslint-disable-next-line
import CustomerCardsOperations from '@basePath/Subscriptions/DataSource/Models/CustomerCardsOperations';
// eslint-disable-next-line
import CustomerSubscriptionOperations from '@basePath/Subscriptions/DataSource/Models/CustomerSubscriptionOperations';
import {GetClientDetails}
  from '@basePath/OfficeClients/Commands/GetClientDetails';
import moment from 'moment';
// eslint-disable-next-line
import {FormResponseSchema} from '@basePath/Api/DataSource/Models/Schema/FormResponseSchema';
// eslint-disable-next-line
import {ForgotTokenSchema} from '@basePath/Web/DataSource/Models/Schema/ForgotTokensSchema';
import ForgotTokens from '@basePath/Web/DataSource/Models/ForgotTokens';
import {AppSignUpCustomer} from '@basePath/Customer/Commands/AppSignUpCustomer';
// eslint-disable-next-line
import {ClientHealthPlanSchema} from '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
/**
 * DataSource class for AdminDataSource
 */
export default class AdminDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async getCustomer(data: any) {
    return new Customer(UserSchema).create(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async createCustomer(data: any) {
    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      // data.temp_password = data.password
      data.password = bcrypt.hashSync(data.password, salt);
    }
    return new Customer(UserSchema).create(data);
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async appSignUpCustomer(data:AppSignUpCustomer) {
    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      // data.temp_password = data.password
      data.password = bcrypt.hashSync(data.password, salt);
    }

    let url = '';
    const logParams: any = {};
    logParams.name = 'Creating new Customer';
    logParams.table_name = 'users';
    logParams.action = 'create customer api';
    logParams.params = JSON.stringify(data);
    try {
      return await UserSchema.findOne({email: data.email}).then(
          async (user) => {
            if (user) {
              if (user.status) {
                throw new ResourceNotFound(
                    'Email already exists',
                    '',
                );
              }
              const customerUserData = await CustomerSchema.findOne({
                user_id: user._id,
              });
              if (
                customerUserData &&
              !customerUserData.health_assessment_submitted
              ) {
                throw new ResourceNotFound(
                    'Please Submit Health Assessment to Continue to Sign Up.',
                    '',
                );
              }
              let createCustomerObj: any = {};
              createCustomerObj = {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                current_health_journey_status: 'health_assessment',
              };
              await UserSchema.findByIdAndUpdate(user._id, {
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                status: data.status,
              });

              await CustomerSchema.findOneAndUpdate(
                  {user_id: user._id},
                  createCustomerObj,
              );
              /** Email Sending code */
              const salt = bcrypt.genSaltSync(10);
              const tokenId = bcrypt.hashSync(data.email, salt);
              let fwdobj: any = {};

              fwdobj = {
                email: data.email,
                token_id: tokenId,
                user_id: user._id,
                request_type: 'verifyEmail',
              };

              const tokenDoc = await new ForgotTokens(ForgotTokenSchema).create(
                  fwdobj,
              );

              const displayName = data.first_name + ' ' + data.last_name;

              const str = tokenDoc._id;

              url = environment.pwa_base_url + 'verifyemail/' + str;
              await new Customer(UserSchema).sendCreateUserMail(
                  data.email,
                  url,
                  'verify_email',
                  displayName,
                  '',
              );
              /** Email Sending code end*/
              logParams.response = 'App signup Customer is done successfully';
              new LogsDataSource().addLog(logParams);
              return user;

            /* if(data.is_auto_login){
              let opt:any = {
                method:'POST',
                body:{'username': data.email,'password':data.temp_password},
                params:{'username': data.email,'password':data.temp_password},
                query:{},
                headers: {
                   // eslint-disable-next-line
                 'authorization':
                   'Basic R3JpdHdlbGwtQ29yZTpablhaOXB0WEhiNzdwaE9KYkdVcQ==',
                  'content-type': 'application/x-www-form-urlencoded',
                  'accept-encoding': 'gzip, deflate, br',
                 'content-length': '67'
                }
              }
              const middlewareFactory = new MiddlewareFactory();
               // eslint-disable-next-line
              const tokenResp =
                await middlewareFactory.signupGenearateToken(opt, {})
              let returnObj = {
                email:createUser.email,
                is_password_updated:createUser.is_password_updated
              }
              if(tokenResp.token){
               Object.assign(returnObj,{
                token: tokenResp.token
               })
              }
              return returnObj
            } */
            } else {
              throw new ResourceNotFound(
                  'Please Submit Health Assessment to Continue to Sign Up.',
                  '',
              );
            } // end of else
          },
      );
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
  async updateCustomer(data: any) {
    return new Customer(UserSchema).update(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async remove(data: any) {
    return await new Customer(CustomerSchema).remove(data);
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async reSendEmailVerification(data: any) {
    return await new Customer(
        CustomerSchema,
    ).customerReSendEmailVerificationLink(data);
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async appointments(data: Appointments) {
    const userCommand = new ClientAppointments({
      params: {
        id: data.user_id,
        onlyFirstAppointment: data.onlyFirstAppointment,
        type: data.type,
      },
    });
    return await new CommandFactory().getCommand(
        userCommand.path,
        true,
        userCommand,
    );
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async validateAppointment(data: ValidateAppointment) {
    try {
      // const isPaymentRequired: Boolean = false;
      // const isPaymentDone: Boolean = false;

      const userId: string = data.userData.user_id;
      const appointmentId: string = data.appointmentId;
      const appontInfo = await new AcuityOperations().appointmentFindFun({
        _id: ObjectId(appointmentId),
        client_id: ObjectId(userId),
      });
      const settingInfo = await new AcuityOperations().settingFindFun({
        object_key: 'appointment_reschedule_or_cancel_cost',
      });
      if (appontInfo === null) {
        throw new ResourceNotFound('Appointment not found', '');
      }
      if (settingInfo === null) {
        throw new ResourceNotFound('cost not found', '');
      }
      const paymentFees =
        settingInfo && settingInfo.object_value ? settingInfo.object_value : 25;
      // eslint-disable-next-line
      const settingAppntHoursInfo = await new AcuityOperations().settingFindFun(
          {
            object_key: 'appointment_reschedule_or_cancel_within_hours',
          },
      );
      if (settingAppntHoursInfo === null) {
        throw new ResourceNotFound(
            'Appointment reschedule/cancel within hours not found',
            '',
        );
      }

      const appntReshRCanclHours =
        settingAppntHoursInfo && settingAppntHoursInfo.object_value ?
          settingAppntHoursInfo.object_value :
          48;
      // eslint-disable-next-line
      const appontRshRcancelHoursCon: boolean =
        await new AcuityOperations().checkAppointmentReshRCanclHours({
          start_date: appontInfo.start_date,
          offSet: data.offSet,
          appntReshRCanclHours: appntReshRCanclHours,
        });

      if (appontRshRcancelHoursCon && !appontInfo.cncl_r_rshl_payment_done) {
        return {
          isPaymentRequired: true,
          isPaymentDone: appontInfo.cncl_r_rshl_payment_done,
          paymentFees: paymentFees,
        };
      } else {
        return {
          isPaymentRequired: false,
          isPaymentDone: appontInfo.cncl_r_rshl_payment_done,
          paymentFees: paymentFees,
        };
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async appointmentPayment(data: AppointmentPayment) {
    try {
      const userId: string = data.userData.user_id;
      const appointmentId: string = data.appointmentId;
      const userInfo = await new AcuityOperations().usersFindFun({
        _id: ObjectId(userId),
      });
      if (userInfo === null) {
        throw new ResourceNotFound('User not found', '');
      }
      const userEmail: string = userInfo.email;

      const apptInfo = await new AcuityOperations().appointmentFindFun({
        _id: ObjectId(appointmentId),
      });
      if (apptInfo === null) {
        throw new ResourceNotFound('appointment not found', '');
      }

      const settingInfo = await new AcuityOperations().settingFindFun({
        object_key: 'appointment_reschedule_or_cancel_cost',
      });

      if (settingInfo === null) {
        throw new ResourceNotFound('cost not found', '');
      }
      const paymentFees: number =
        settingInfo && settingInfo.object_value ?
          parseFloat(settingInfo.object_value) :
          25;

      const settingAppntHoursInfo = await new AcuityOperations().settingFindFun(
          {
            object_key: 'appointment_reschedule_or_cancel_within_hours',
          },
      );

      if (settingAppntHoursInfo === null) {
        throw new ResourceNotFound(
            'Appointment reschedule/cancel within hours not found',
            '',
        );
      }

      const appntReshRCanclHours =
        settingAppntHoursInfo && settingAppntHoursInfo.object_value ?
          settingAppntHoursInfo.object_value :
          48;

      const custmInfo =
        await new SubscriptionsDataSource().checkUserSubscriptionStatus(
            {user_id: ObjectId(userId)},
            'Customer not found',
        );
      const stripeCustomerId: string = custmInfo.stripe_customer_id;
      if (stripeCustomerId === '' || stripeCustomerId == null) {
        throw new ResourceNotFound('Please add card', '');
      }
      const checkCard = await new CustomerCardsOperations().getCustomerCards({
        stripe_customer_id: stripeCustomerId,
        stripe_card_id: data.cardId,
        user_id: ObjectId(userId),
      });
      if (checkCard && checkCard.length === 0) {
        throw new ResourceNotFound('Card not found', '');
      }

      const stripePaymentIntentInfo: any =
        await new StripeOperations().stripePaymentIntentsCreation({
          amount: paymentFees * 100,
          currency: 'USD',
          customer: stripeCustomerId,
          description:
            'Payment for appointment reschedule or cancel with in ' +
            appntReshRCanclHours +
            ' hrs',
          metadata: {
            userEmail: userEmail,
          },
        });
      const stripeIntentId: string = stripePaymentIntentInfo.paymentIntentId;

      const stripePaymentIntentConfirmInfo: any =
        await new StripeOperations().stripePaymentIntentConfirm({
          paymentIntentId: stripeIntentId,
          paymentId: data.cardId,
        });
      const paymentStatus =
        stripePaymentIntentConfirmInfo.paymentConfirmResponse.status;
      // eslint-disable-next-line
      await new CustomerSubscriptionOperations().customerSubscriptionHistoryCreate(
          {
            user_id: userId,
            amount: paymentFees,
            stripe_subscription_object:
            stripePaymentIntentConfirmInfo.paymentConfirmResponse,
            stripe_status:
            stripePaymentIntentConfirmInfo.paymentConfirmResponse.status,
            transaction_type: 'cncl_r_rshl_appointment',
            stripe_customer_id: stripeCustomerId,
            stripe_card_id: data.cardId,
            appointment_id: appointmentId,
            payment_status:
            stripePaymentIntentConfirmInfo.paymentConfirmResponse.status,
            order_id: moment().unix(),
          },
      );
      await new AcuityOperations().appointmentUpdateFun(
          {_id: ObjectId(appointmentId)},
          {cncl_r_rshl_payment_done: true},
          {new: true},
      );
      // Email sending
      const userCommand = new GetClientDetails({
        params: {id: userId},
      });
      const customerInfo = await new CommandFactory().getCommand(
          userCommand.path,
          true,
          userCommand,
      );
      const displayName =
        customerInfo.first_name + ' ' + customerInfo.last_name;
      // eslint-disable-next-line
      const bodyMessage: string = 'Your appointment has been Rescheduled/Canceling.<br/> $' + paymentFees + ' has been deducted for Rescheduling/Canceling the appointment within ' +
        appntReshRCanclHours +
        ' hours of your current appointment.';

      await new Customer(CustomerSchema).sendCreateUserMail(
          userEmail,
          '',
          'apt_resh_r_cancl_email',
          displayName,
          bodyMessage,
      );
      return {
        paymentStatus,
      };
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async intakeForm(data: IntakeForm) {
    try {
      const formResp: any = await this.getClientFormResponseId({
        type_form_id: environment.TYPE_FORM_INTAKE,
        users_id: ObjectId(data.user_id),
      });
      if (formResp) {
        const typeFormCommand = new ClientDocument({
          params: {
            client_id: data.user_id,
            form_response_id: ObjectId(formResp._id),
            type_form_id: environment.TYPE_FORM_INTAKE,
          },
        });
        return await new CommandFactory().getCommand(
            typeFormCommand.path,
            true,
            typeFormCommand,
        );
      } else {
        throw new ResourceNotFound('Response not found', '');
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async symptomAnalysis(data: SymptomAnalysis) {
    try {
      const formResp: any = await this.getClientFormResponseId({
        type_form_id: environment.TYPE_FORM_SYMPTOM_ANALYSIS,
        users_id: ObjectId(data.user_id),
      });
      if (formResp) {
        const typeFormCommand = new ClientDocument({
          params: {
            client_id: data.user_id,
            form_response_id: ObjectId(formResp._id),
            type_form_id: environment.TYPE_FORM_SYMPTOM_ANALYSIS,
          },
        });
        return await new CommandFactory().getCommand(
            typeFormCommand.path,
            true,
            typeFormCommand,
        );
      } else {
        throw new ResourceNotFound('Response not found', '');
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async myPhasesOfCare(data: MyPhasesOfCare) {
    const healthPlan = await this.getCustomerActiveHealthPlanData({
      client_id: data.user_id,
      is_active: true,
    });
    if (healthPlan && healthPlan.length>0) {
      const getHealthPlanCommand = new GetHealthPlan({
        params: {
          client_id: data.user_id,
          health_plan_id: healthPlan[0]._id,
          type: 'phasesOfCare',
        },
      });
      return await new CommandFactory().getCommand(
          getHealthPlanCommand.path,
          true,
          getHealthPlanCommand,
      );
    } else {
      throw new ResourceNotFound('No data found', '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async getClientFormResponseId(data: Object) {
    try {
      return await FormResponseSchema.find(data)
          .sort({_id: 1})
          .limit(1)
          .then(async (resp: any) => {
            if (resp && resp.length > 0) {
              return resp[0];
            } else {
              return {};
            }
          });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async getCustomerActiveHealthPlanData(matchObj:Object) {
    try {
      return await ClientHealthPlanSchema.find(matchObj);
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}
