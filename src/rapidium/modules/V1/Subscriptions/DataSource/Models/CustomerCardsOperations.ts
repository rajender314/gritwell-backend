import {CustomerCardsSchema}
  from
  '@basePath/Subscriptions/DataSource/Models/Schema/CustomerCards';

import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';

/**
 * class CustomerCardsOperations
 */
export default class CustomerCardsOperations {
  /**
   * createCustomerCard
   * @param {data} data
   * @return {Object}
   */
  async createCustomerCard(data: Object) {
    try {
      const createCustomerCard =
              await CustomerCardsSchema.create(data);
      return createCustomerCard;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * updateCustomerCard
   * @param {matchObj} matchObj
   * @param {updateObj} updateObj
   * @param {optionsObj} optionsObj
   * @return {Object}
   */
  async updateCustomerCard(
      matchObj: Object,
      updateObj: Object,
      optionsObj: Object,
  ) {
    try {
      const updateRes =
              await CustomerCardsSchema.findOneAndUpdate(
                  matchObj,
                  updateObj,
                  optionsObj,
              );
      return updateRes;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * updateMultipleCustomerCards
   * @param {matchObj} matchObj
   * @param {updateObj} updateObj
   * @param {optionsObj} optionsObj
   * @return {Object}
   */
  async updateMultipleCustomerCards(
      matchObj: Object,
      updateObj: Object,
      optionsObj: Object,
  ) {
    try {
      const updateRes = await CustomerCardsSchema.updateMany(
          matchObj,
          updateObj,
          optionsObj,
      );
      return updateRes;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * getCustomerCards
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async getCustomerCards(matchObj: Object) {
    try {
      const cards =
              await CustomerCardsSchema.find(
                  matchObj,
              );
      return cards;
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}
