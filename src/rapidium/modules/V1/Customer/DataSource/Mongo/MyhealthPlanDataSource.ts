import {MyhealthPlan} from '@basePath/Customer/Commands/MyhealthPlan';
import {MyhealthPlanItemMarkasComplete}
  from '@basePath/Customer/Commands/MyhealthPlanItemMarkasComplete';
import {MyhealthPlanItemasViewedCommand}
  from '@basePath/Customer/Commands/MyhealthPlanItemasViewedCommand';
import ClientAppointmentsDataSource
  from '@basePath/OfficeClients/DataSource/Mongo/ClientAppointmentsDataSource';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {ClientHealthPlanSchema}
  from
  '@basePath/HealthPlan/DataSource/Models/Schema/ClientHealthPlanSchema';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
// eslint-disable-next-line
import { ClientHealthPlanItemMarkasCompleteSchema } from "@basePath/Customer/DataSource/Models/Schema/CustomerHealthPlanMarkasComplete";
// eslint-disable-next-line
import {ClientHealthPlanItemsVisitsSchema} from '@basePath/Customer/DataSource/Models/Schema/CustomerHealthPlanItemsVisitsSchema';
import {UndoDailyGoalMarkasComplete}
  from '@basePath/Customer/Commands/UndoDailyGoalMarkasComplete';
import {MyTests} from '@basePath/Customer/Commands/MyTests';
import {GetTests} from '@basePath/HealthPlan/Commands/GetTests';
import {ClientStatusesSchema}
  from '@basePath/HealthPlan/DataSource/Models/Schema/ClientStatusesSchema';

import {GetHealthPlan} from '@basePath/HealthPlan/Commands/GetHealthPlan';
import moment from 'moment';
/**
 * class MyhealthPlanDataSource
 */
export default class MyhealthPlanDataSource {
  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async myhealthPlan(data: MyhealthPlan) {
    const planDate = data.planDate;
    const apptData =
      await new ClientAppointmentsDataSource().getAppointmentFromDate(
          planDate,
          data.user_id,
      );
    if (apptData == null) {
      throw new ResourceNotFound('No data found', '');
    }

    const healthPlan = await this.getClientPlanData({
      client_id: ObjectId(data.user_id),

      appointment_id: apptData._id,
    });

    if (healthPlan == null) {
      throw new ResourceNotFound('No data found', '');
    }

    // nutrition

    const getNutritionCommand = new GetHealthPlan({
      params: {
        client_id: data.user_id,
        health_plan_id: healthPlan._id,
        type: 'nutrition',
      },
    });

    const nutritionsResp = await new CommandFactory().getCommand(
        getNutritionCommand.path,
        true,
        getNutritionCommand,
    );

    const nutritionsObj = nutritionsResp.nutritions;
    const nutritions = [
      ...nutritionsObj.increase,
      ...nutritionsObj.decrease,
      ...nutritionsObj.avoid,
    ];
    const nutritionsCount =
      nutritionsResp && nutritionsResp.count ? nutritionsResp.count : 0;

    // lifestyle

    const getLifeStyleCommand = new GetHealthPlan({
      params: {
        client_id: data.user_id,
        health_plan_id: healthPlan._id,
        type: 'lifestyle',
      },
    });

    const lifestyleResp = await new CommandFactory().getCommand(
        getLifeStyleCommand.path,
        true,
        getLifeStyleCommand,
    );

    const lifestyle =
      lifestyleResp && lifestyleResp.lifestyle ?
        [...lifestyleResp.lifestyle] :
        [];
    const lifeStyleCount =
      lifestyleResp && lifestyleResp.count ? lifestyleResp.count : 0;

    // Supplements

    const getSupplementsCommand = new GetHealthPlan({
      params: {
        client_id: data.user_id,
        health_plan_id: healthPlan._id,
        type: 'supplement',
      },
    });
    const supplementsResp = await new CommandFactory().getCommand(
        getSupplementsCommand.path,
        true,
        getSupplementsCommand,
    );

    const supplements =
      supplementsResp && supplementsResp.supplements ?
        supplementsResp.supplements :
        [];
    const supplementsCount =
      supplementsResp && supplementsResp.count ? supplementsResp.count : 0;

    // Health Plan Message
    const getnotesCommand = new GetHealthPlan({
      params: {
        client_id: data.user_id,
        health_plan_id: healthPlan._id,
        type: 'message',
      },
    });
    const healthPlanMessageResp = await new CommandFactory().getCommand(
        getnotesCommand.path,
        true,
        getnotesCommand,
    );
    const healthPlanMessage =
      healthPlanMessageResp && healthPlanMessageResp.notes ?
        healthPlanMessageResp.notes :
        '';

    // Mark as completed

    if (nutritionsCount > 0) {
      nutritions.forEach((nutrition) => {
        nutrition.trackStatus = 'New';
        nutrition.markasCompleted = false;
        nutrition.markasCompletedId = '';
      });
    }
    if (lifeStyleCount > 0) {
      lifestyle.forEach((lifestyles) => {
        lifestyles.trackStatus = 'New';
        lifestyles.markasCompleted = false;
        lifestyles.markasCompletedId = '';
        lifestyles.type = 'Do';
      });
    }
    if (supplementsCount > 0) {
      supplements.forEach((supplement) => {
        supplement.trackStatus = 'New';
        supplement.markasCompleted = false;
        supplement.markasCompletedId = '';
        supplement.type = 'Take';
      });
    }

    const findObj = {
      client_id: ObjectId(data.user_id),
      mark_as_complete_date: new Date(planDate),
    };
    const markObjs: any = await ClientHealthPlanItemMarkasCompleteSchema.find(
        findObj,
    );

    if (markObjs && markObjs.length > 0) {
      markObjs.forEach((markObj) => {
        if (nutritionsCount > 0) {
          nutritions.forEach((nutrition) => {
            if (
              ObjectId(markObj.healthplan_item_id).toString() ===
              ObjectId(nutrition._id).toString()
            ) {
              nutrition.markasCompleted = true;
              nutrition.markasCompletedId = markObj._id;
            }
          });
        }
        if (lifeStyleCount > 0) {
          lifestyle.forEach((lifestyles) => {
            if (
              ObjectId(markObj.healthplan_item_id).toString() ===
              ObjectId(lifestyles._id).toString()
            ) {
              lifestyles.markasCompleted = true;
              lifestyles.markasCompletedId = markObj._id;
            }
          });
        }
        if (supplementsCount > 0) {
          supplements.forEach((supplement) => {
            if (
              ObjectId(markObj.healthplan_item_id).toString() ===
              ObjectId(supplement._id).toString()
            ) {
              supplement.markasCompleted = true;
              supplement.markasCompletedId = markObj._id;
            }
          });
        }
      });
    }
    const markasCompletedNutritions =
      nutritionsCount > 0 ?
        nutritions.filter((nutrition) => {
          return nutrition.markasCompleted === true;
        }).length :
        0;

    const markasCompletedLifestylesCount =
      lifeStyleCount > 0 ?
        lifestyle.filter((lfstyle) => {
          return lfstyle.markasCompleted === true;
        }).length :
        0;

    const markasCompletedSupplementsCount =
      supplementsCount > 0 ?
        supplements.filter((supplement) => {
          return supplement.markasCompleted === true;
        }).length :
        0;

    // Health plan items viewed
    const viewedFindObj = {
      client_id: ObjectId(data.user_id),
      health_plan_id: ObjectId(healthPlan._id),
    };
    const healthPlanItemsViewdObjs: any =
      await ClientHealthPlanItemsVisitsSchema.find(viewedFindObj);
    if (healthPlanItemsViewdObjs && healthPlanItemsViewdObjs.length > 0) {
      healthPlanItemsViewdObjs.forEach((viewedObj) => {
        if (nutritionsCount > 0) {
          nutritions.forEach((nutrition) => {
            if (
              ObjectId(viewedObj.healthplan_item_id).toString() ===
              ObjectId(nutrition._id).toString()
            ) {
              nutrition.trackStatus = 'Viewed';
            }
          });
        }
        if (lifeStyleCount > 0) {
          lifestyle.forEach((lifestyles) => {
            if (
              ObjectId(viewedObj.healthplan_item_id).toString() ===
              ObjectId(lifestyles._id).toString()
            ) {
              lifestyles.trackStatus = 'Viewed';
            }
          });
        }
        if (supplementsCount > 0) {
          supplements.forEach((supplement) => {
            if (
              ObjectId(viewedObj.healthplan_item_id).toString() ===
              ObjectId(supplement._id).toString()
            ) {
              supplement.trackStatus = 'Viewed';
            }
          });
        }
      });
    }

    return {
      nutritions: nutritions,
      nutritionsCount: nutritionsCount,
      markasCompletedNutritionsCount: markasCompletedNutritions,
      lifestyle: lifestyle,
      lifeStyleCount: lifeStyleCount,
      markasCompletedLifestylesCount: markasCompletedLifestylesCount,
      supplements: supplements,
      supplementsCount: supplementsCount,
      markasCompletedSupplementsCount: markasCompletedSupplementsCount,
      healthPlanMessage: healthPlanMessage,
      healthPlanId: healthPlan._id,
    };
  }
  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async getClientPlanData(matchObj: Object) {
    return await ClientHealthPlanSchema.findOne(matchObj);
  }
  /**
   *
   * @param {data} data
   * return {Object}
   */
  async dailyGoalMarkasComplete(data: MyhealthPlanItemMarkasComplete) {
    try {
      const findObj = {
        client_id: ObjectId(data.user_id),
        mark_as_complete_date: new Date(data.completedDate),
        healthplan_item_id: data.healthPlanItemId,
      };
      const markObjs: any = await ClientHealthPlanItemMarkasCompleteSchema.find(
          findObj,
      );

      if (markObjs && markObjs.length > 0) {
        throw new ResourceNotFound('Plan item already submitted.', '');
      } else {
        const createObj = {
          client_id: ObjectId(data.user_id),
          healthplan_item_type: data.healthPlanItemType,
          healthplan_item_id: data.healthPlanItemId,
          mark_as_complete_date: moment(data.completedDate).format(
              'YYYY-MM-DD',
          ),
          created_by: data.created_by,
          created_date: data.created_date,
          last_modified_by: data.last_modified_by,
          last_modified_date: data.last_modified_date,
        };

        const markObj = await ClientHealthPlanItemMarkasCompleteSchema.create(
            createObj,
        );
        return markObj;
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   * @param {data} data
   * return {Object}
   */
  async undoDailyGoalMarkasComplete(data: UndoDailyGoalMarkasComplete) {
    const markObjs: any = await ClientHealthPlanItemMarkasCompleteSchema.find({
      _id: ObjectId(data.id),
    });
    if (markObjs && markObjs.length > 0) {
      return await ClientHealthPlanItemMarkasCompleteSchema.findOneAndDelete({
        _id: ObjectId(data.id),
      });
    } else {
      throw new ResourceNotFound('Id not found', '');
    }
  }
  /**
   * @param {data} data
   * return {Object}
   */
  async healthPlanItemasViewed(data: MyhealthPlanItemasViewedCommand) {
    try {
      const findObj = {
        client_id: ObjectId(data.user_id),
        health_plan_id: ObjectId(data.healthPlanId),
        healthplan_item_id: ObjectId(data.healthPlanItemId),
      };
      const healthPlanItemsViewdObjs: any =
        await ClientHealthPlanItemsVisitsSchema.find(findObj);
      if (healthPlanItemsViewdObjs && healthPlanItemsViewdObjs.length > 0) {
        throw new ResourceNotFound('Plan item already viewed.', '');
      } else {
        const createObj = {
          client_id: ObjectId(data.user_id),
          health_plan_id: ObjectId(data.healthPlanId),
          healthplan_item_id: ObjectId(data.healthPlanItemId),
          created_by: data.created_by,
          created_date: data.created_date,
          last_modified_by: data.last_modified_by,
          last_modified_date: data.last_modified_date,
        };

        const planItemViewedObj =
          await ClientHealthPlanItemsVisitsSchema.create(createObj);
        return planItemViewedObj;
      }
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   *
   * @param {data} data
   * return {Object}
   */
  async getMyTests(data: MyTests) {
    const planDate = data.planDate;
    const apptData =
      await new ClientAppointmentsDataSource().getAppointmentFromDate(
          planDate,
          data.user_id,
      );
    if (apptData == null) {
      throw new ResourceNotFound('No data found', '');
    }

    const healthPlan = await this.getClientPlanData({
      client_id: ObjectId(data.user_id),

      appointment_id: apptData._id,
    });

    if (healthPlan == null) {
      throw new ResourceNotFound('healthPlan No data found', '');
    }

    const getTestingCommand = new GetTests({
      client_id: data.user_id,
      health_plan_id: healthPlan._id,
    });
    const {tests, count} = await new CommandFactory().getCommand(
        getTestingCommand.path,
        true,
        getTestingCommand,
    );
    const statuses = await ClientStatusesSchema.find();

    return {
      tests: tests,
      count: count,
      statuses: statuses,
    };
  }
}
