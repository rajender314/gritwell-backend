import {ClientSubscription}
  from '@basePath/Subscriptions/Commands/ClientSubscription';
import {ClientPauseSubscription}
  from '@basePath/Subscriptions/Commands/ClientPauseSubscription';
import {ClientResumeSubscription}
  from '@basePath/Subscriptions/Commands/ClientResumeSubscription';
import {ClientCancelSubscription}
  from '@basePath/Subscriptions/Commands/ClientCancelSubscription';

import {SubscriptionPlansSchema}
  from '@basePath/PWA/DataSource/Models/Schema/SubscriptionPlans';

import {UserSchema}
  from '@basePath/Admin/DataSource/Models/Schema/UserSchema';

import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
// eslint-disable-next-line
import {StripePaymentResponsesSchema} from '@basePath/Subscriptions/DataSource/Models/Schema/StripePaymentsResponsesSchema';
import {PaymentStatusesSchema}
  from '@basePath/Subscriptions/DataSource/Models/Schema/PaymentStatusesSchema';
// eslint-disable-next-line
import CustomerSubscriptionOperations from '@basePath/Subscriptions/DataSource/Models/CustomerSubscriptionOperations';
import CustomerCardsOperations
  from '@basePath/Subscriptions/DataSource/Models/CustomerCardsOperations';

import StripeOperations
  from '@basePath/Subscriptions/DataSource/Models/StripeOperations';
import {ObjectId}
  from '@rapCore/src/Mongodb/Types';
import {AddCard}
  from '@basePath/Subscriptions/Commands/AddCard';
import {GetCards}
  from '@basePath/Subscriptions/Commands/GetCards';
import {UpdateDefaultCard}
  from '@basePath/Subscriptions/Commands/UpdateDefaultCard';
import {EmailTemplateSchema}
  from '@rapCore/src/Base/Mailer/EmailTemplateSchema';
// import moment from 'moment';
import {MailController} from '@basePath/EmailClass';
import {
  ResourceNotFound,
  ResourceRecordNotFound,
} from '@basePath/Exceptions/ResourceNotFound';
import moment from 'moment';
require('dotenv').config();
const environment = process.env;
const stripe = require('stripe')(environment.STRIPE_SECRET_KEY);
/**
 * class SubscriptionsDataSource
 */
export default class SubscriptionsDataSource {
  /**
   * createPaymentInfo
   * @param {data} data
   * @return {Object}
   */
  async createPaymentInfo(data: any) {
    return new Promise(async (resolve, reject) => {
      await stripe.tokens.create({
        card: {
          number: data.cardNumber,
          exp_month: data.expMonth,
          exp_year: data.expYear,
          cvc: data.cardCvv,
        },
      }, async (err: any, resp: any) => {
        if (err) {
          return resolve({error: err.message});
        } else {
          return resolve({token: resp.id});
        }
      });
      /* await this.stripePaymentMethodCreationfun(async (response: any) => {
          return resolve({paymentMethodId: response.id});
        });*/
    });
  }

  /**
   * @param {callback} callback
   * @return {Object}
   */
  async stripePaymentMethodCreationfun(callback?: any) {
    return await stripe.paymentMethods.create(
        {
          type: 'card',
          card: {
            number: '4242424242424242',
            exp_month: 4,
            exp_year: 2023,
            cvc: '314',
          },
        },
        async (err: any, resp: any) => {
        // console.log('err-->', err);
        // console.log('resp-->', resp.id);

          if (err) {
            return await callback(err.message);
          } else {
            return await callback(resp);
          }
        },
    );
  }

  /**
   * @param {data} data ClientSubscription command
   * @return {Object} subscription success or fail information
   */
  async clientsubscription(data: ClientSubscription) {
    try {
      let priceId: string = '';
      // let userEmail: string = '';
      let stripeCustomerId: string = '';
      const planInfo = await this.getSubscriptionPlanInfo(data.planSlug);
      priceId = planInfo.price_id;
      const planDuration: number = parseInt(planInfo.plan_duration);
      if (data && data.userData && data.userData.user_id) {
        // const UserData = await this.getUserInfo(data.userData.user_id);
        // userEmail = UserData.email;
        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
          subscription_status: {$nin: ['active', 'pause']},
        };
        const custmInfo = await this.checkUserSubscriptionStatus(
            matchObj,
            'Customer already subscribed',
        );
        stripeCustomerId = custmInfo.stripe_customer_id;
        if (stripeCustomerId === '' || stripeCustomerId == null) {
          throw new ResourceNotFound('Please add card', '');
        }

        const checkCard = await new CustomerCardsOperations().getCustomerCards({
          stripe_customer_id: stripeCustomerId,
          stripe_card_id: data.cardId,
          user_id: ObjectId(data.userData.user_id),
        });
        if (checkCard && checkCard.length === 0) {
          throw new ResourceNotFound('Card not found', '');
        }
      } else {
        throw new ResourceNotFound('No User Found', '');
      }

      const stripeSubscriptionInfo: any =
        await new StripeOperations().stripesubscriptionSchedulesCreate({
          customer: stripeCustomerId,
          priceId: priceId,
          planDuration: planDuration,
          paymentId: data.cardId,
        });
      const stripeSubscriptionResponse =
        stripeSubscriptionInfo.subscriptionCreateResponse;

      const subscriptionStDate =
        stripeSubscriptionResponse.current_phase &&
        stripeSubscriptionResponse.current_phase.start_date ?
          new Date(stripeSubscriptionResponse.current_phase.start_date * 1000) :
          '';
      const formatedSubStDate = moment(subscriptionStDate).format('DD MMMM YYYY');
      const subEndDt =
        stripeSubscriptionResponse.current_phase &&
        stripeSubscriptionResponse.current_phase.end_date ?
          new Date(stripeSubscriptionResponse.current_phase.end_date * 1000) :
          '';
      const oneDayAddedSubEndDate = subEndDt ?
        new Date(subEndDt.setDate(subEndDt.getDate() + 1)) :
        '';

      const paymentStatusInfo = await this.paymentStatusFindFun({
        code: 'processing',
      });

      let paymentStatusId = '';
      if (paymentStatusInfo) {
        paymentStatusId = paymentStatusInfo._id;
      }
      const orderId: string = 'GWC' + moment().unix();
      /** creating record in customer_subscription_histories collection */
      const customerSubscriptionHistoryObj = {
        user_id: data.userData.user_id,
        subscription_plan_id: planInfo._id,
        amount: planInfo.plan_price,
        transaction_type: 'Subscription',
        plan_duration: planDuration,
        stripe_customer_id: stripeCustomerId,
        stripe_card_id: data.cardId,
        stripe_subscription_schedule_id: stripeSubscriptionResponse.id,
        stripe_subscription_id: stripeSubscriptionResponse.subscription,
        stripe_status: stripeSubscriptionResponse.status,
        subscription_start_date: subscriptionStDate,
        subscription_end_date: oneDayAddedSubEndDate,
        subscription_status: 'active',
        payment_status: 'processing',
        payment_status_id: paymentStatusId,
        order_id: orderId,
        created_by: data.created_by,
        created_date: data.created_date,
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date,
      };
      // eslint-disable-next-line
      const custSubHisCreateRes =
        await new CustomerSubscriptionOperations().customerSubscriptionHistoryCreate(
            customerSubscriptionHistoryObj,
        );

      /** creating a record in StripePaymentResponsesSchema*/
      await StripePaymentResponsesSchema.create({
        customer_subscription_history_id: custSubHisCreateRes._id,
        response: stripeSubscriptionResponse,
        created_by: data.created_by,
        created_date: data.created_date,
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date,
      });

      /** updating customer collection */
      const customerUpdateObj = {
        customer_subscription_history_id: custSubHisCreateRes._id,
        stripe_subscription_schedule_id: stripeSubscriptionResponse.id,
        stripe_subscription_id: stripeSubscriptionResponse.subscription,
        subscription_plan_id: planInfo._id,
        stripe_subscription_object: stripeSubscriptionResponse,
        subscription_start_date: subscriptionStDate,
        subscription_end_date: oneDayAddedSubEndDate,
        stripe_status: stripeSubscriptionResponse.status,
        subscription_status: 'active',
        payments_count: 0,
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date,
      };

      await CustomerSchema.findOneAndUpdate(
          {user_id: data.userData.user_id},
          customerUpdateObj,
          {new: true},
      );
      const custUser =
        await new CustomerSubscriptionOperations().getCustomerUserdata({
          _id: ObjectId(data.userData.user_id),
        });
      const displayName = custUser.first_name + ' ' + custUser.last_name;
      const cards = await new CustomerCardsOperations().getCustomerCards({
        stripe_card_id: data.cardId,
      });


      await this.sendSubscriptionMails(
          custUser.email,
          displayName,
          planInfo.plan_type,
          orderId,
          formatedSubStDate,
          formatedSubStDate,
          planInfo.plan_price.toString(),
          cards[0].card_number,
          'customer_subscription_success',
      );

      return {
        subscription_id: stripeSubscriptionResponse.subscription,
      };
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * clientPauseSubscription
   * @param {data} data
   * @return {Object}
   */
  async clientPauseSubscription(data: ClientPauseSubscription) {
    try {
      let userId: string = '';
      const subscriptionId: string = data.subscriptionId;
      if (data && data.userData && data.userData.user_id) {
        userId = data.userData.user_id;

        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
          stripe_subscription_id: subscriptionId,
          subscription_end_date: {
            $exists: true,
            $ne: null,
            $gte: new Date(),
          },
          subscription_status: 'active',
        };

        await this.checkUserSubscriptionStatus(
            matchObj,
            'Customer subscription must be active state',
        );
      } else {
        throw new ResourceNotFound('No User Found', '');
      }

      const stripeSubscriptionUpdateInfo: any =
        await new StripeOperations().stripeSubscriptionUpdate(
            {
              pause_collection: {
                behavior: 'void',
              },
            },
            'pause',
            subscriptionId,
        );
      const subscriptionUpdateRes =
        stripeSubscriptionUpdateInfo.subscriptionUpdateResponse;
      // eslint-disable-next-line
      await new CustomerSubscriptionOperations().customerSubscriptionPauseHistoryCreate(
          {
            action: 'pause',
            user_id: ObjectId(userId),
            stripe_subscription_id: subscriptionId,
            stripe_subscription_object: subscriptionUpdateRes,
            stripe_status: subscriptionUpdateRes.status,
            subscription_status: 'pause',
            paused_on: new Date(),
            created_by: data.created_by,
            created_date: data.created_date,
            last_modified_by: data.last_modified_by,
            last_modified_date: data.last_modified_date,
          },
      );

      const matchObject = {
        user_id: ObjectId(userId),
        stripe_subscription_id: subscriptionId,
      };
      const customerUpdateObj = {
        stripe_status: subscriptionUpdateRes.status,
        subscription_status: 'pause',
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date,
      };
      // eslint-disable-next-line
      await new CustomerSubscriptionOperations().customerSubscriptionHistoryUpdate(
          matchObject,
          customerUpdateObj,
          {new: true},
      );

      await CustomerSchema.findOneAndUpdate(matchObject, customerUpdateObj, {
        new: true,
      });

      return 'Subscription paused successfully';
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   * clientResumeSubscription
   * @param {data} data
   * @return {Object}
   */
  async clientResumeSubscription(data: ClientResumeSubscription) {
    try {
      let userId: string = '';
      const subscriptionId: string = data.subscriptionId;

      if (data && data.userData && data.userData.user_id) {
        userId = data.userData.user_id;

        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
          stripe_subscription_id: subscriptionId,
          subscription_end_date: {
            $exists: true,
            $ne: null,
            $gte: new Date(),
          },
          subscription_status: 'pause',
        };

        await this.checkUserSubscriptionStatus(
            matchObj,
            'Customer subscription must be pause state',
        );
      } else {
        throw new ResourceNotFound('No User Found', '');
      }
      const checkPauseCondResp: boolean =
        await new CustomerSubscriptionOperations().checkResumeConditions(
            subscriptionId,
        );

      if (checkPauseCondResp) {
        const stripeSubscriptionUpdateInfo: any =
          await new StripeOperations().stripeSubscriptionUpdate(
              {
                pause_collection: '',
              },
              'resume',
              subscriptionId,
          );
        const subscriptionUpdateRes =
          stripeSubscriptionUpdateInfo.subscriptionUpdateResponse;
        // eslint-disable-next-line
        await new CustomerSubscriptionOperations().customerSubscriptionPauseHistoryCreate(
            {
              action: 'unpausing',
              user_id: ObjectId(userId),
              stripe_subscription_id: subscriptionId,
              stripe_subscription_object: subscriptionUpdateRes,
              stripe_status: subscriptionUpdateRes.status,
              subscription_status: 'active',
              resumed_on: new Date(),
              created_by: data.created_by,
              created_date: data.created_date,
              last_modified_by: data.last_modified_by,
              last_modified_date: data.last_modified_date,
            },
        );

        const matchObject = {
          user_id: ObjectId(userId),
          stripe_subscription_id: subscriptionId,
        };
        const customerUpdateObj = {
          stripe_status: subscriptionUpdateRes.status,
          subscription_status: 'active',
          last_modified_by: data.last_modified_by,
          last_modified_date: data.last_modified_date,
        };
        // eslint-disable-next-line
        await new CustomerSubscriptionOperations().customerSubscriptionHistoryUpdate(
            matchObject,
            customerUpdateObj,
            {new: true},
        );

        await CustomerSchema.findOneAndUpdate(matchObject, customerUpdateObj, {
          new: true,
        });

        return 'Subscription resumed successfully';
      } else {
        throw new ResourceNotFound('Fail to resume subscription', '');
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * clientCancelSubscription
   * @param {data} data
   * @return {Object}
   */
  async clientCancelSubscription(data: ClientCancelSubscription) {
    try {
      let userId: string = '';
      const subscriptionId: string = data.subscriptionId;
      if (data && data.userData && data.userData.user_id) {
        userId = data.userData.user_id;
        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
          stripe_subscription_id: subscriptionId,
          subscription_end_date: {
            $exists: true,
            $ne: null,
            $gte: new Date(),
          },
          subscription_status: {$in: ['active', 'pause']},
        };

        await this.checkUserSubscriptionStatus(
            matchObj,
            'Customer subscription must be active or pause state',
        );
      } else {
        throw new ResourceNotFound('No User Found', '');
      }

      const stripeSubscriptionCancelInfo: any =
        await new StripeOperations().stripeSubscriptionCancel(subscriptionId);
      const cancelSubscriptionRes =
        stripeSubscriptionCancelInfo.cancelSubscriptionResponse;
      // eslint-disable-next-line
      await new CustomerSubscriptionOperations().customerSubscriptionPauseHistoryCreate(
          {
            action: 'cancel',
            user_id: ObjectId(userId),
            stripe_subscription_id: subscriptionId,
            stripe_subscription_object: cancelSubscriptionRes,
            stripe_status: cancelSubscriptionRes.status,
            subscription_status: 'canceled',
            canceled_on: new Date(),
            created_by: data.created_by,
            created_date: data.created_date,
            last_modified_by: data.last_modified_by,
            last_modified_date: data.last_modified_date,
          },
      );

      const matchObject = {
        user_id: ObjectId(userId),
        stripe_subscription_id: subscriptionId,
      };
      const customerUpdateObj = {
        stripe_status: cancelSubscriptionRes.status,
        subscription_status: 'canceled',
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date,
      };
      // eslint-disable-next-line
      await new CustomerSubscriptionOperations().customerSubscriptionHistoryUpdate(
          matchObject,
          customerUpdateObj,
          {new: true},
      );

      await CustomerSchema.findOneAndUpdate(matchObject, customerUpdateObj, {
        new: true,
      });

      return 'Subscription canceled successfully';
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {userId} userId
   * @return {Object}
   */
  async getUserInfo(userId: string) {
    try {
      const userInfo = await UserSchema.findById(userId);
      if (userInfo == null) {
        throw new ResourceRecordNotFound('User not found', '');
      }
      return userInfo;
    } catch (err: any) {
      throw new ResourceRecordNotFound(err.message, '');
    }
  }
  /**
   * @param {matchObj} matchObj
   * @param {errMsg} errMsg
   * @return {Object}
   */
  async checkUserSubscriptionStatus(matchObj: Object, errMsg: string) {
    try {
      return await CustomerSchema.findOne(matchObj)
          .then(async (customer) => {
            if (customer != null) {
              return customer;
            } else {
              if (errMsg) {
                throw new ResourceRecordNotFound(errMsg, '');
              }
              throw new ResourceRecordNotFound(
                  'Customer with subscription is not Active or not found',
                  '',
              );
            }
          })
          .catch(async (error: any) => {
            throw new ResourceRecordNotFound(error.message, '');
          });
    } catch (error: any) {
      throw new ResourceRecordNotFound(error.message, '');
    }
  }
  /**
   * @param {planSlug} planSlug
   * @return {Object}
   */
  async getSubscriptionPlanInfo(planSlug: string) {
    try {
      const slug = ['advance', 'comprehensive'];
      if (!slug.includes(planSlug)) {
        // return {success:false,message:'Invalid Slug',data:{}}
        throw new ResourceRecordNotFound('Invalid Slug', '');
      }
      const planInfo = await SubscriptionPlansSchema.findOne({
        plan_slug: planSlug,
        status: true,
      });
      if (planInfo == null) {
        throw new ResourceRecordNotFound('Plan not found', '');
      }

      return planInfo;
    } catch (err: any) {
      throw new ResourceRecordNotFound(err.message, '');
    }
  }

  /**
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async getSubscriptionPlanData(matchObj: Object) {
    const planInfo = await SubscriptionPlansSchema.findOne(matchObj);
    return planInfo;
  }

  /**
   * stripeWebhook
   * @param {data} data
   * @return {Object}
   */
  async stripeWebhook(data: any) {
    const eventTypeData = data.response.type;

    switch (eventTypeData) {
      case 'invoice.created':
        // console.log("invoice.created-->", data.response);
        if (data.response.data.object.subscription) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };
          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            const amount: number =
              data.response.data.object.amount_paid &&
              data.response.data.object.amount_paid > 0 ?
                parseInt(data.response.data.object.amount_paid) / 100 :
                0;
            const customerSubPaymentObj = {
              amount: amount,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.created',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
          }
        }
        break;
      case 'invoice.finalized':
        // console.log("invoice.finalized-->", data.response);
        if (data.response.data.object.subscription) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };
          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            const amount: number =
              data.response.data.object.amount_paid &&
              data.response.data.object.amount_paid > 0 ?
                parseInt(data.response.data.object.amount_paid) / 100 :
                0;
            const customerSubPaymentObj = {
              amount: amount,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.finalized',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
          }
        }
        break;

      case 'invoice.finalization_failed':
        break;
      case 'invoice.payment_action_required':
        // subscription status incomplete
        if (data.response.data.object.subscription) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };

          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            const amount: number =
              data.response.data.object.amount_paid &&
              data.response.data.object.amount_paid > 0 ?
                parseInt(data.response.data.object.amount_paid) / 100 :
                0;
            const customerSubPaymentObj = {
              amount: amount,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.payment_action_required',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
            await CustomerSchema.findOneAndUpdate(
                {stripe_subscription_id: stripeSubscriptionId},
                {
                  stripe_status: data.response.data.object.status,
                  subscription_status: 'incomplete',
                },
                {new: true},
            );
          }
        }
        // return eventTypeData;
        break;
      case 'invoice.upcoming':
        // console.log("invoice.upcoming-->", data.response);
        if (data.response.data.object.subscription) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };
          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            const amount: number =
              data.response.data.object.amount_paid &&
              data.response.data.object.amount_paid > 0 ?
                parseInt(data.response.data.object.amount_paid) / 100 :
                0;
            const customerSubPaymentObj = {
              amount: amount,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.upcoming',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
          }
        }
        // return eventTypeData;
        break;
      case 'invoice.updated':
        // console.log("invoice.updated-->", data.response);
        if (data.response.data.object.subscription) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };
          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            const amount: number =
              data.response.data.object.amount_paid &&
              data.response.data.object.amount_paid > 0 ?
                parseInt(data.response.data.object.amount_paid) / 100 :
                0;
            const customerSubPaymentObj = {
              amount: amount,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.updated',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
          }
        }
        // return eventTypeData;
        break;
      case 'invoice.paid':
        if (
          data.response.data.object.subscription &&
          data.response.data.object.paid
        ) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };
          const orderId: string = 'GWC' + moment().unix();
          const paymentStatusInfo = await this.paymentStatusFindFun({
            code: 'paid',
          });

          let paymentStatusId = '';
          if (paymentStatusInfo) {
            paymentStatusId = paymentStatusInfo._id;
          }

          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            /** creating record in customer_subscription_payments collection */
            const subDetails =
              await new CustomerSubscriptionOperations().customerSubscriptionHistoryFind(
                  {
                    stripe_subscription_id: stripeSubscriptionId,
                  },
              );
            if (
              subDetails &&
              subDetails.length > 0 &&
              subDetails[0].payment_status &&
              subDetails[0].payment_status == 'processing'
            ) {
              // update
              await new CustomerSubscriptionOperations().customerSubscriptionHistoryUpdate(
                  {
                    stripe_subscription_id: stripeSubscriptionId,
                    payment_status: 'processing',
                  },
                  {payment_status: 'paid', payment_status_id: paymentStatusId},
                  {new: true},
              );
            } else {
              const customerSubscriptionHistoryObj = {
                user_id: subDetails[0].user_id,
                subscription_plan_id: subDetails[0].subscription_plan_id,
                amount: parseInt(data.response.data.object.amount_paid) / 100,
                transaction_type: 'Subscription',
                plan_duration: subDetails[0].plan_duration,
                stripe_customer_id: subDetails[0].stripe_customer_id,
                stripe_card_id: subDetails[0].stripe_card_id,
                stripe_subscription_schedule_id:
                  subDetails[0].stripe_subscription_schedule_id,
                stripe_subscription_id: stripeSubscriptionId,
                stripe_status: subDetails[0].stripe_status,
                subscription_start_date: subDetails[0].subscription_start_date,
                subscription_end_date: subDetails[0].subscription_end_date,
                subscription_status: 'active',
                payment_status: 'paid',
                payment_status_id: paymentStatusId,
                order_id: orderId,
                created_by: data.created_by,
                created_date: data.created_date,
                last_modified_by: data.last_modified_by,
                last_modified_date: data.last_modified_date,
              };
              // eslint-disable-next-line
              const custSubHisCreateRes =
                await new CustomerSubscriptionOperations().customerSubscriptionHistoryCreate(
                    customerSubscriptionHistoryObj,
                );

              /** creating a record in StripePaymentResponsesSchema*/
              await StripePaymentResponsesSchema.create({
                customer_subscription_history_id: custSubHisCreateRes._id,
                response: data.response,
                created_by: data.created_by,
                created_date: data.created_date,
                last_modified_by: data.last_modified_by,
                last_modified_date: data.last_modified_date,
              });
              // Email code
              const planInfo: any = await this.getSubscriptionPlanData({
                _id: subDetails[0].subscription_plan_id,
                status: true,
              });
              const custUser =
                await new CustomerSubscriptionOperations().getCustomerUserdata({
                  _id: customer.user_id,
                });
              const displayName = custUser.first_name + ' ' + custUser.last_name;

              const cards = await new CustomerCardsOperations().getCustomerCards({
                stripe_card_id: subDetails[0].stripe_card_id,
              });

              await this.sendSubscriptionMails(
                  custUser.email,
                  displayName,
                  planInfo.plan_type,
                  orderId,
                  subDetails[0].subscription_start_date.toString(),
                  subDetails[0].subscription_start_date.toString(),
                  planInfo.plan_price.toString(),
                  cards[0].card_number,
                  'customer_subscription_payment_success',
              );
              // Email code ends
            }// end of else

            const customerSubPaymentObj = {
              amount: parseInt(data.response.data.object.amount_paid) / 100,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.paid',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
            const subPaymentsCount =
              await new CustomerSubscriptionOperations().getSubscriptionPaymentsCount(
                  {
                    stripe_subscription_id: stripeSubscriptionId,
                    stripe_status: 'paid',
                  },
              );
            await CustomerSchema.findOneAndUpdate(
                {stripe_subscription_id: stripeSubscriptionId},
                {payments_count: subPaymentsCount},
                {new: true},
            );
          }
        }
        // return eventTypeData;
        break;
      case 'invoice.payment_failed':
        // The status of the subscription changes to incomplete
        // console.log("eventTypeData-->", eventTypeData);
        // console.log("eventTypeData-->", data.response);
        if (data.response.data.object.subscription) {
          const stripeSubscriptionId = data.response.data.object.subscription;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };

          const customer = await this.checkUserSubscriptionStatus(matchObj, '');
          if (customer && customer._id) {
            const amount: number =
              data.response.data.object.amount_paid &&
              data.response.data.object.amount_paid > 0 ?
                parseInt(data.response.data.object.amount_paid) / 100 :
                0;
            const customerSubPaymentObj = {
              amount: amount,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'invoice.payment_failed',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
            await CustomerSchema.findOneAndUpdate(
                {stripe_subscription_id: stripeSubscriptionId},
                {
                  stripe_status: data.response.data.object.status,
                  subscription_status: 'incomplete',
                },
                {new: true},
            );
          }
        }
        // return eventTypeData;
        break;

      case 'customer.subscription.deleted':
        // Sent when a customer’s subscription ends.
        // console.log(
        //   "eventTypeData-->",
        //   eventTypeData,
        //   data.response.data.object.id
        // );

        // console.log("sub id-->", data.response.data.object.id);
        // console.log("sub status-->", data.response.data.object.status);

        if (data.response.data.object.id) {
          const stripeSubscriptionId = data.response.data.object.id;
          const matchObj = {
            stripe_subscription_id: stripeSubscriptionId,
          };

          const customer = await this.checkUserSubscriptionStatus(matchObj, '');

          if (customer && customer._id) {
            const customerSubPaymentObj = {
              stripe_subscription_id: stripeSubscriptionId,
              stripe_webHook_action: 'customer.subscription.deleted',
              stripe_webHook_object: data.response,
              stripe_status: data.response.data.object.status,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            };
            await new CustomerSubscriptionOperations().customerSubscriptionPaymentsCreate(
                customerSubPaymentObj,
            );
            await CustomerSchema.findOneAndUpdate(
                {stripe_subscription_id: stripeSubscriptionId},
                {
                  stripe_status: data.response.data.object.status,
                  subscription_status: 'completed',
                },
                {new: true},
            );
          }
        }
        // return eventTypeData;
        break;
      case 'customer.subscription.created':
        break;
      case 'customer.subscription.updated':
        break;

      case 'customer.subscription.trial_will_end':
        break;

      case 'payment_intent.created':
        break;
      case 'payment_intent.succeeded':
        break;

      default:
        // return 'Unhandled event type ' + eventTypeData;
        break;
    }
    return eventTypeData;
  }
  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async addCard(data: AddCard) {
    try {
      const stripeTokenId: string = data.stripeTokenId;
      const isDefault: Boolean = data.isDefault ? data.isDefault : false;
      let stpCustomerId: string = '';
      let isNewCustomer: Boolean = false;
      if (
        data &&
        data.userData &&
        data.userData.user_id &&
        data.userData.email
      ) {
        const userEmail: string = data.userData.email;
        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
        };
        const customerInfo = await this.checkUserSubscriptionStatus(
            matchObj,
            'Customer not found',
        );
        // console.log("customerInfo-->", data);
        if (customerInfo && customerInfo.stripe_customer_id) {
          stpCustomerId = customerInfo.stripe_customer_id;
        } else {
          // need to create customer
          const stripeCustomerInfo: any =
            await new StripeOperations().stripeCustomerCreation({
              payment_method: '',
              email: userEmail,
              name: '',
            });
          stpCustomerId = stripeCustomerInfo.customerId;
          isNewCustomer = true;

          /** updating stripe_customer_id in customer */
          const customerUpdateObj = {
            stripe_customer_id: stpCustomerId,
            last_modified_by: data.last_modified_by,
            last_modified_date: data.last_modified_date,
          };
          await CustomerSchema.findOneAndUpdate(matchObj, customerUpdateObj, {
            new: true,
          });
        }

        const ctdata = {
          customerId: stpCustomerId,
          tokenId: stripeTokenId,
        };
        const addCardTokenToCustomer: any =
          await new StripeOperations().addCardToCustomer(ctdata);

        if (addCardTokenToCustomer && addCardTokenToCustomer.createSourceResp) {
          const stripeCardAddResp = addCardTokenToCustomer.createSourceResp;
          const cardInfo = {
            user_id: data.userData.user_id,
            stripe_customer_id: stpCustomerId,
            stripe_card_id: stripeCardAddResp.id,
            card_brand: stripeCardAddResp.brand,
            card_number: stripeCardAddResp.last4,
            card_expiry_month: stripeCardAddResp.exp_month,
            card_expiry_year: stripeCardAddResp.exp_year,
            card_holder_name: stripeCardAddResp.name ?
              stripeCardAddResp.name :
              '',
            is_default: isNewCustomer ? isNewCustomer : isDefault,
            status: true,
            created_date: data.created_date,
            created_by: data.created_by,
            last_modified_date: data.last_modified_date,
            last_modified_by: data.last_modified_by,
          };

          const card = await new CustomerCardsOperations().createCustomerCard(
              cardInfo,
          );

          if (isNewCustomer ? isNewCustomer : isDefault) {
            await new CustomerCardsOperations().updateMultipleCustomerCards(
                {
                  stripe_customer_id: stpCustomerId,
                  stripe_card_id: {$ne: stripeCardAddResp.id},
                },
                {$set: {is_default: false}},
                {multi: true},
            );
          }

          await new StripeOperations().stripeCustomerUpdate(stpCustomerId, {
            default_source: stripeCardAddResp.id,
          });
          return card;
        }
      } else {
        throw new ResourceNotFound('No User Found', '');
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async getCards(data: GetCards) {
    try {
      if (data && data.userData && data.userData.user_id) {
        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
        };

        const cards = await new CustomerCardsOperations().getCustomerCards(
            matchObj,
        );

        return cards;
      } else {
        throw new ResourceNotFound('No User Found', '');
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async updateDefaultCard(data: UpdateDefaultCard) {
    try {
      if (data && data.userData && data.userData.user_id) {
        const matchObj = {
          user_id: ObjectId(data.userData.user_id),
          _id: ObjectId(data.cardId),
        };
        await new CustomerCardsOperations().updateCustomerCard(
            matchObj,
            {is_default: true},
            {new: true},
        );
        await new CustomerCardsOperations().updateMultipleCustomerCards(
            {
              user_id: ObjectId(data.userData.user_id),
              _id: {$ne: ObjectId(data.cardId)},
            },
            {$set: {is_default: false}},
            {multi: true},
        );

        const cardInfo = await new CustomerCardsOperations().getCustomerCards(
            matchObj,
        );

        if (cardInfo && cardInfo.length > 0) {
          const stpCustomerId: string = cardInfo[0].stripe_customer_id;
          const stpCardId: string = cardInfo[0].stripe_card_id;
          await new StripeOperations().stripeCustomerUpdate(stpCustomerId, {
            default_source: stpCardId,
          });
        }

        return 'Successfully updated the default card';
      } else {
        throw new ResourceNotFound('No User Found', '');
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async paymentStatusFindFun(matchObj: object) {
    return await PaymentStatusesSchema.findOne(matchObj);
  }

  /**
    * @param {email} email
   * @param {displayName} displayName
   * @param {planName} planName
   * @param {orderId} orderId
   * @param {dateOfPurchase} dateOfPurchase
   * @param {subscriptionStarts} subscriptionStarts
   * @param {amount} amount
   * @param {cardNumber} cardNumber
   * @param {template} template
   */
  async sendSubscriptionMails(
      email: string,
      displayName: string,
      planName: string,
      orderId: string,
      dateOfPurchase: string,
      subscriptionStarts: string,
      amount: string,
      cardNumber: string,
      template: string,
  ) {
    EmailTemplateSchema.findOne({db_name: template, status: true}).then(
        async (emailTemplate: any) => {
          let htmlText = '';
          const siteUrl = environment.web_base_url;
          const apiUrl = environment.api_base_url;

          const logo = apiUrl + 'uploads/logos/logo.png';
          const fbIcon = apiUrl + 'uploads/logos/facebook.png';
          const instagramIcon = apiUrl + 'uploads/logos/instagram.png';
          const linkedinIcon = apiUrl + 'uploads/logos/linkedIn.png';
          emailTemplate.subject = emailTemplate.subject.replace(
              '{{plan_name}}',
              planName,
          );
          emailTemplate.body = emailTemplate.body.replace(
              '{{plan_name}}',
              planName,
          );
          emailTemplate.body = emailTemplate.body.replace(
              '{{plan_name}}',
              planName,
          );
          emailTemplate.body = emailTemplate.body.replace(
              '{{order_id}}',
              orderId,
          );

          emailTemplate.body = emailTemplate.body.replace(
              '{{date_of_purchase}}',
              dateOfPurchase,
          );
          emailTemplate.body = emailTemplate.body.replace(
              '{{subscription_starts_on}}',
              subscriptionStarts,
          );

          emailTemplate.body = emailTemplate.body.replace(
              '{{amount_paid}}',
              amount,
          );
          emailTemplate.body = emailTemplate.body.replace(
              '{{card_number}}',
              cardNumber,
          );

          emailTemplate.body = emailTemplate.body.replace('{{site_url}}', siteUrl);
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
          new MailController().transport(HelperOptions);
        },
    );
  }
}
