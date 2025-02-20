import {ResourceNotFound}
  from '@basePath/Exceptions/ResourceNotFound';
import {IStripeCustomerCreation}
  from '@basePath/Subscriptions/Interfaces/IStripeCustomerCreation';
import {IStripePaymentIntentsCreation}
  from '@basePath/Subscriptions/Interfaces/IStripePaymentIntentsCreation';
import {IStripePaymentIntentConfirm}
  from '@basePath/Subscriptions/Interfaces/IStripePaymentIntentConfirm';
import {IStripeSubscriptionSchedulesCreate}
  from '@basePath/Subscriptions/Interfaces/IStripeSubscriptionSchedulesCreate';
import {LogSchema} from '@basePath/Logs/DataSource/Models/Schema/LogSchema';
import moment from 'moment';
require('dotenv').config();
const environment = process.env;
const stripe = require('stripe')(environment.STRIPE_SECRET_KEY);

/**
 * class StripeOperations
 */
export default class StripeOperations {
  /**
   * @param {data} data
   * @return {Object}
   */
  async stripeCustomerCreation(data: IStripeCustomerCreation) {
    try {
      const logParams: any = {};
      logParams.name = 'Customer creation in stripe';
      logParams.action = 'Customer creation in stripe';
      logParams.params = JSON.stringify(data);

      return new Promise(async (resolve, reject) => {
        await stripe.customers.create(
            {email: data.email},
            async function(err: any, customerData: any) {
              if (err) {
              // console.log('create customer error-->', err)
                logParams.response = err.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(err.message, ''));
              } else {
                const customerId: any = customerData.id;
                logParams.response = customerId;
                await LogSchema.create(logParams);

                return resolve({customerId: customerId});
              }
            },
        );
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
 *
 * @param {customerId} customerId
 * @param {updateObj} updateObj
 * @return {Object}
 */
  async stripeCustomerUpdate(customerId: string, updateObj: Object) {
    try {
      const logParams: any = {};
      logParams.name = 'Customer update in stripe';
      logParams.action = 'Customer update in stripe';
      logParams.params = JSON.stringify(updateObj);
      return new Promise(async (resolve, reject) => {
        await stripe.customers.update(
            customerId,
            updateObj,
            async (err:any, customerData:any)=>{
              if (err) {
              // console.log('create customer error-->', err)
                logParams.response = err.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(err.message, ''));
              } else {
                const customerId: any = customerData.id;
                logParams.response = customerId;
                await LogSchema.create(logParams);

                return resolve({customerData: customerData});
              }
            },
        );
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async stripeTokenCreation(data: any) {
    const logParams: any = {};
    logParams.name = 'Card token creation in stripe';
    logParams.action = 'Card token in stripe';
    logParams.params = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
      await stripe.tokens.create(data, async (err: any, tokenResp: any) => {
        if (err) {
          // console.log('create customer error-->', err)
          logParams.response = err.message;
          await LogSchema.create(logParams);

          return reject(new ResourceNotFound(err.message, ''));
        } else {
          logParams.response = tokenResp.id;
          await LogSchema.create(tokenResp);

          return resolve({tokenId: tokenResp.id});
        }
      });
    });
  }

  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async addCardToCustomer(data: any) {
    const logParams: any = {};
    logParams.name = 'Card adding to customer in stripe';
    logParams.action = 'Card adding to customer in stripe';
    logParams.params = JSON.stringify(data);
    // console.log("data-->", data);
    return new Promise(async (resolve, reject) => {
      await stripe.customers.createSource(
          data.customerId,
          {source: data.tokenId},
          async (err: any, createSourceResp: any) => {
            if (err) {
              // console.log("add card to customer error-->", err);
              logParams.response = err.message;
              await LogSchema.create(logParams);

              return reject(new ResourceNotFound(err.message, ''));
            } else {
              logParams.response = createSourceResp.id;
              await LogSchema.create(createSourceResp);

              return resolve({createSourceResp: createSourceResp});
            }
          },
      );
    });
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async stripePaymentIntentsCreation(data: IStripePaymentIntentsCreation) {
    try {
      const logParams: any = {};
      logParams.name = 'Payment intent creation in stripe';
      // logParams.table_name = 'users';
      logParams.action = 'Payment intent creation in stripe';
      logParams.params = JSON.stringify(data);
      return new Promise(async (resolve, reject) => {
        await stripe.paymentIntents.create(
            data,
            async (err: any, chargeResponse: any) => {
              if (err) {
                logParams.response = err.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(err.message, ''));
              } else {
                const paymentIntentId: string = chargeResponse.id;
                logParams.response = paymentIntentId;
                await LogSchema.create(logParams);
                return resolve({paymentIntentId: paymentIntentId});
              }
            },
        );
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async stripePaymentIntentConfirm(data: IStripePaymentIntentConfirm) {
    try {
      const logParams: any = {};
      logParams.name = 'Payment intent confirm in stripe';
      // logParams.table_name = 'users';
      logParams.action = 'Payment intent confirm in stripe';
      logParams.params = JSON.stringify(data);
      return new Promise(async (resolve, reject) => {
        await stripe.paymentIntents.confirm(
            data.paymentIntentId,
            {
              payment_method: data.paymentId,
            },
            async (err: any, confirmResponse: any) => {
              if (err) {
                logParams.response = err.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(err.message, ''));
              } else {
                logParams.response = JSON.stringify(confirmResponse);
                await LogSchema.create(logParams);
                return resolve({paymentConfirmResponse: confirmResponse});
              }
            },
        );
        // .then(async (payRes: any) => { })
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async stripesubscriptionSchedulesCreate(
      data: IStripeSubscriptionSchedulesCreate,
  ) {
    try {
      const logParams: any = {};
      logParams.name = 'Subscription schedule creation in stripe';
      // logParams.table_name = 'users';
      logParams.action = 'Subscription schedule creation in stripe';
      logParams.params = JSON.stringify(data);
      return new Promise(async (resolve, reject) => {
        await stripe.subscriptionSchedules.create(
            {
              customer: data.customer,
              start_date: moment().unix(),
              end_behavior: 'cancel',
              default_settings: {
                default_payment_method: data.paymentId,
              },
              phases: [
                {
                  items: [
                    {
                      price: data.priceId,
                      quantity: 1,
                    },
                  ],
                  iterations: data.planDuration,
                },
              ],
            },
            async function(err: any, subscriptionRes: any) {
              if (err) {
                logParams.response = err.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(err.message, ''));
              } else {
                logParams.response = JSON.stringify(subscriptionRes);
                await LogSchema.create(logParams);

                return resolve({subscriptionCreateResponse: subscriptionRes});
              }
            },
        );
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {updateObj} updateObj
   * @param {action} action
   * @param {subscriptionId} subscriptionId
   * @return {Object}
   */
  async stripeSubscriptionUpdate(
      updateObj: Object,
      action: string,
      subscriptionId: string,
  ) {
    try {
      const logParams: any = {};
      logParams.name = 'Subscription update in stripe';
      logParams.action = action;
      logParams.params = JSON.stringify(updateObj);
      return new Promise(async (resolve, reject) => {
        await stripe.subscriptions.update(
            subscriptionId,
            updateObj,
            async function(error: any, subscriptionUpdateRes: any) {
              if (error) {
                logParams.response = error.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(error.message, ''));
              } else {
                logParams.response = JSON.stringify(subscriptionUpdateRes);
                await LogSchema.create(logParams);

                return resolve({
                  subscriptionUpdateResponse: subscriptionUpdateRes,
                });
              }
            },
        );
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {subscriptionId} subscriptionId
   * @return {Object}
   */
  async stripeSubscriptionCancel(subscriptionId: string) {
    try {
      const logParams: any = {};
      logParams.name = 'Subscription cancel in stripe';
      logParams.action = 'cancel';
      logParams.params = JSON.stringify({subscriptionId: subscriptionId});
      return new Promise(async (resolve, reject) => {
        await stripe.subscriptions.del(
            subscriptionId,
            async function(error: any, cancelSubscriptionRes: any) {
              if (error) {
                logParams.response = error.message;
                await LogSchema.create(logParams);

                return reject(new ResourceNotFound(error.message, ''));
              } else {
                logParams.response = JSON.stringify(cancelSubscriptionRes);
                await LogSchema.create(logParams);

                return resolve({
                  cancelSubscriptionResponse: cancelSubscriptionRes,
                });
              }
            },
        );
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}
