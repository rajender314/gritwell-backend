// import BaseModel from '@rapCoreBase/Models/BaseModel';
// eslint-disable-next-line
import {CustomerSubscriptionHistorySchema} from '@basePath/Subscriptions/DataSource/Models/Schema/CustomerSubscriptionHistory';
// eslint-disable-next-line
import {CustomerSubscriptionPaymentsSchema} from '@basePath/Subscriptions/DataSource/Models/Schema/CustomerSubscriptionPayments';
// eslint-disable-next-line
import {CustomerSubscriptionPauseHistorySchema} from '@basePath/Subscriptions/DataSource/Models/Schema/CustomerSubscriptionPauseHistory';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
/**
 * class CustomerSubscriptionOperations
 */
export default class CustomerSubscriptionOperations {
  /** collection CustomerSubscriptionHistorySchema operations  */
  /**
   * customerSubscriptionHistoryFind
   * @param {data} data
   * @return {Object}
   */
  async customerSubscriptionHistoryFind(data: Object) {
    try {
      const customerSubscriptionHistory =
          await CustomerSubscriptionHistorySchema.find(data);
      return customerSubscriptionHistory;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * customerSubscriptionHistoryCreate
   * @param {data} data
   * @return {Object}
   */
  async customerSubscriptionHistoryCreate(data: Object) {
    try {
      const customerSubscriptionHistory =
        await CustomerSubscriptionHistorySchema.create(data);
      return customerSubscriptionHistory;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * customerSubscriptionHistoryUpdate
   * @param {matchObj} matchObj
   * @param {updateObj} updateObj
   * @param {optionsObj} optionsObj
   * @return {Object}
   */
  async customerSubscriptionHistoryUpdate(
      matchObj: Object,
      updateObj: Object,
      optionsObj: Object,
  ) {
    try {
      const updateRes =
        await CustomerSubscriptionHistorySchema.findOneAndUpdate(
            matchObj,
            updateObj,
            optionsObj,
        );
      return updateRes;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /** collection CustomerSubscriptionPaymentsSchema operations  */
  /**
   * customerSubscriptionPaymentsCreate
   * @param {data} data
   * @return {Object}
   */
  async customerSubscriptionPaymentsCreate(data: Object) {
    try {
      const customerSubscriptionPayment =
        await CustomerSubscriptionPaymentsSchema.create(data);
      return customerSubscriptionPayment;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   *
   * @param {matchObj} matchObj
   * @return {Number}
   */
  async getSubscriptionPaymentsCount(matchObj: Object) {
    try {
      return await CustomerSubscriptionPaymentsSchema.countDocuments(
          matchObj,
          function(err, count) {
            if (err) {
              return 0;
            } else {
              return count;
            }
          },
      );
    } catch (error: any) {
      return 0;
    }
  }

  /** collection CustomerSubscriptionPauseHistorySchema operations  */
  /**
   * customerSubscriptionPauseHistoryCreate
   * @param {data} data
   * @return {Object}
   */
  async customerSubscriptionPauseHistoryCreate(data: Object) {
    try {
      const custSubPauseHistory =
        await CustomerSubscriptionPauseHistorySchema.create(data);
      return custSubPauseHistory;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
 *
 * @param {subscriptionId} subscriptionId
 * @return {Boolean}
 */
  async checkResumeConditions(subscriptionId: string) {
    try {
      const matchObj = {
        stripe_subscription_id: subscriptionId,
        subscription_status: 'pause',
        paused_on: {$exists: true},
      };
      const custSubPauseHistory =
        await CustomerSubscriptionPauseHistorySchema.find(matchObj)
            .sort({_id: -1})
            .limit(1);
      if (custSubPauseHistory && custSubPauseHistory.length>0) {
        const subPauseInfo = custSubPauseHistory[0];
        const pausedOn = subPauseInfo.paused_on;
        const today = new Date();
        const diffInfo = await this.monthDiff(pausedOn, today);

        return diffInfo >2 ? false :true;
      }

      return false;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   *
   * @param {d1} d1
   * @param {d2} d2
   * @return {Number}
   */
  async monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  /**
   * @param {matchObject} matchObject
   * @return {Object}
   */
  async getCustomerUserdata(matchObject:Object) {
    try {
      return await UserSchema.aggregate([
        {
          $match: matchObject,
        },
        {
          $lookup: {
            from: 'customers',
            localField: '_id',
            foreignField: 'user_id',
            as: 'customer_data',
          },
        },
        {
          $unwind: {
            path: '$customer_data',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]).then(async (user:any)=>{
        return user ? user[0] : '';
      });
    } catch (error:any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}
