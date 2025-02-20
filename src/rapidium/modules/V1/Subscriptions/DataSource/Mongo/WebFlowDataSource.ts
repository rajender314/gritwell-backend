import moment from 'moment';

import {SubscriptionPlansSchema}
  from '@basePath/PWA/DataSource/Models/Schema/SubscriptionPlans';
import {WebSiteCustomersSchema}
  from '@basePath/Subscriptions/DataSource/Models/Schema/WebSiteCustomers';
// eslint-disable-next-line
import {WebSiteSubscriptionDetailsSchema} from '@basePath/Subscriptions/DataSource/Models/Schema/WebSiteSubscriptionDetails';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
require('dotenv').config();
const environment = process.env;
const stripe = require('stripe')(environment.STRIPE_SECRET_KEY);
/**
 * class WebFlowDataSource
 */
export default class WebFlowDataSource {
  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async webFlowStripeWebhook(data: any) {
    const eventTypeData = data.response.type;
    switch (eventTypeData) {
      case 'invoice.paid':
        // console.log("invoice.paid-->", data.response.data.object);
        if (
          data.response.data.object.subscription &&
          data.response.data.object.paid
        ) {
         
        
          const websiteSubObj = {
            transaction_type: 'Subscription_Payment',
            subscription_status: 'Active',
            amount: parseInt(data.response.data.object.amount_paid) / 100,
            stripe_response: data.response,
            created_date: new Date(),
            last_modified_date: new Date(),
          };
          
          const getSubdetails: any =
            await this.webSiteSubscriptionDetailsSchemaFind({
              stripe_subscription_id: data.response.data.object.subscription,
              transaction_type: 'Subscription',
            });
          if (
            getSubdetails &&
            getSubdetails.subscription_plan_id &&
            getSubdetails.plan_duration &&
            getSubdetails.subscription_start_date &&
            getSubdetails.subscription_end_date
          ) {

            if (data.response.data.object.customer_email) {
              const customerInfo = await this.webSiteCustomersSchemaFind({
                email: data.response.data.object.customer_email,
              });
              if (customerInfo && customerInfo._id) {
                Object.assign(websiteSubObj, {
                  website_customer_id: ObjectId(customerInfo._id),
                });
              }
            }

            Object.assign(websiteSubObj, {
              subscription_plan_id: ObjectId(
                  getSubdetails.subscription_plan_id,
              ),

              plan_duration: parseInt(getSubdetails.plan_duration),
              subscription_start_date: getSubdetails.subscription_start_date,
              subscription_end_date: getSubdetails.subscription_end_date,
            });
 
            await WebSiteSubscriptionDetailsSchema.create(websiteSubObj);

          }

         
        }

        break;

      case 'customer.subscription.created':
        const websiteSubObj = {
          transaction_type: 'Subscription',
          subscription_status: 'Active',
          stripe_subscription_id: data.response.data.object.id,
          stripe_response: data.response,
          created_date: new Date(),
          last_modified_date: new Date(),
        };
        await stripe.customers.retrieve(
            data.response.data.object.customer,
            async (error: any, customer: any)=> {
              if (error) {
                console.log('customers retrieve error---> ', error.message);
                return {};
              } else {
                if (customer && customer.email) {
                  const websiteCustomer: any =
                  await this.webSiteCustomersSchemaFindandUpdate(
                      {email: customer.email},
                      {
                        email: customer.email,
                        name: customer.name,
                        address: customer.address,
                        phone: customer.phone,
                        created_date: new Date(),
                        last_modified_date: new Date(),
                      },
                      {new: true, upsert: true},
                  );
                  // console.log('websiteCustomer-->', websiteCustomer);
                  if (websiteCustomer && websiteCustomer._id) {
                    Object.assign(websiteSubObj, {
                      website_customer_id: ObjectId(websiteCustomer._id),
                    });
                  }
                }
              }
            });


        const subscriptionStDate = data.response.data.object.start_date ?
          new Date(data.response.data.object.start_date * 1000) :
          '';


        const product = await stripe.products.retrieve(
            data.response.data.object.plan.product,
        );
        // console.log("product-->", product.default_price);
        if (product && product.default_price) {
          const SubscriptionPlansSchemadata =
            await SubscriptionPlansSchema.findOne({
              price_id: product.default_price,
            });

          if (
            SubscriptionPlansSchemadata &&
            SubscriptionPlansSchemadata.plan_duration
          ) {
            // calculating end date
            const formatedStartDate = new Date(
                data.response.data.object.start_date * 1000,
            );
            // console.log(formatedStartDate);
              // Below for days
            const formatedendDate = formatedStartDate.setDate(
                formatedStartDate.getDate() +
              parseInt(SubscriptionPlansSchemadata.plan_duration),
            );
            // Below formonths
            // const formatedendDate = formatedStartDate.setMonth(
            //     formatedStartDate.getMonth() +
            //     parseInt(SubscriptionPlansSchemadata.plan_duration),
            // );
            // console.log(formatedendDate);
            const formatedendDateTimestamp = moment(formatedendDate).unix();
            // console.log(formatedendDateTimestamp);
            const updatedsubscription = await stripe.subscriptions.update(
                data.response.data.object.id,
                {cancel_at: formatedendDateTimestamp},
            );

            // console.log("updated sub-->", updatedsubscription);
            if (updatedsubscription) {
              Object.assign(websiteSubObj, {
                subscription_plan_id: ObjectId(SubscriptionPlansSchemadata._id),
                amount: SubscriptionPlansSchemadata.plan_price,
                plan_duration: parseInt(
                    SubscriptionPlansSchemadata.plan_duration,
                ),
                subscription_start_date: subscriptionStDate,
                subscription_end_date:
                  new Date(formatedendDateTimestamp * 1000),
              });

              await WebSiteSubscriptionDetailsSchema.create(websiteSubObj);
            }
          }
        }

        break;

      default:
        // return 'Unhandled event type ' + eventTypeData;
        break;
    }
    return eventTypeData;
  }

  /**
   *
   * @param {matchObj} matchObj
   * @param {updateObj} updateObj
   * @param {optionsObj} optionsObj
   * @return {Object}
   */
  async webSiteCustomersSchemaFindandUpdate(
      matchObj: Object,
      updateObj: Object,
      optionsObj: Object,
  ) {
    return await WebSiteCustomersSchema.findOneAndUpdate(
        matchObj,
        updateObj,
        optionsObj,
    );
  }

  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async webSiteCustomersSchemaFind(matchObj: Object) {
    return await WebSiteCustomersSchema.findOne(matchObj);
  }
  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async webSiteSubscriptionDetailsSchemaFind(matchObj: Object) {
    return await WebSiteSubscriptionDetailsSchema.findOne(matchObj);
  }

  /**
   *
   * @param {customerId} customerId
   */
  async getStripeCustomerData(customerId: string) {
    return await stripe.customers.retrieve(
        customerId,
        async (error: any, customer: any)=> {
          if (error) {
            console.log('customers retrieve error---> ', error.message);
            return {};
          } else {
            console.log('customers retrieve ---> ');
            return customer;
          }
        },
    );
  }
}
