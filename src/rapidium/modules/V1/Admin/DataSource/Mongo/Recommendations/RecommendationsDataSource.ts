import { Recommendations } from '@basePath/Admin/Commands/Recommendations';
import { CreateRecommendation }
  from '@basePath/Admin/Commands/CreateRecommendation';

import {
  IRecommendation,
  IRecommendatationResponseData,
} from '@basePath/Admin/Interfaces/IRecommendations';
import { GetImportExportLog }
  from '@basePath/ImportExportLogs/Commands/GetImportExportLog';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
/**
 * class RecommendationsDataSource
 */
export default class RecommendationsDataSource {
  /**
   * create
   * @param {data} data
   * @return {Object}
   */
  async create(data: CreateRecommendation) {
    return await data.schema.create(data.payload);
  }
  /**
 * get
 * @param {data} data
 * @return {Object}
 */
  async get(data: Recommendations) {
    const skip = (data.page - 1) * data.perPage;
    const limit = data.perPage;
    const search = data.search.replace(/\s+/g, ' ').trim();
    let sort = (data.sort == 'DESC') ? -1 : 1;

    const searchQry = {};
    const statusQry = {};

    if (data.type === 'health_plan') {
      Object.assign(statusQry, {
        'status': true
      });
    }

    if (data.search != '') {
      Object.assign(searchQry, {
        $or: [
          { 'name': { $regex: `.*${search}.*`, $options: 'i' } },
          { 'description': { $regex: `.*${search}.*`, $options: 'i' } },
          { 'brand': { $regex: `.*${search}.*`, $options: 'i' } },
          { 'dosage': { $regex: `.*${search}.*`, $options: 'i' } },
          { 'uuid': { $regex: `.*${search}.*`, $options: 'i' } },
          { 'type': { $regex: `.*${search}.*`, $options: 'i' } },
        ],
      });
    }

    const sortQuery = {};

    if (data.column != '' && sort) {
      const column = data.column;
      Object.assign(sortQuery, {
        [column]: sort
      });
    } else {
      Object.assign(sortQuery, {
        'created_date': sort
      });
    }

    return await data.schema.aggregate([
      { $match: searchQry },
      { $match: statusQry },
      { $sort: sortQuery },
      {
        $facet: {
          paginated_results: [
            {
              $skip: skip,
            },
            { $limit: limit },
            {
              $project: {
                'id': 1,
                'name': 1,
                'description': 1,
                'uuid': 1,
                'brand': 1,
                'dosage': 1,
                'price': 1,
                'type': 1,
                'link': 1,
                'status': 1,
              },
            },
          ],
          total_count: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]).then(async (recommendationsData: IRecommendatationResponseData[]) => {
      let activity: any = {};
      const recommendations: IRecommendation[] =
        recommendationsData[0].paginated_results;
      const recommendationsCount: number =
        recommendationsData[0].total_count &&
          recommendationsData[0].total_count[0] &&
          recommendationsData[0].total_count[0].count ?
          recommendationsData[0].total_count[0].count :
          0;
      // if (recommendations.length) {
      //   recommendations.map((recommendation, index) => {
      //     if (recommendation.price != null) {
      //       const price = recommendation.price.toFixed(2);
      //       recommendations[index].price_with_symbol = `$${price}`;
      //       //delete (recommendation.price);
      //     }
      //   });
      //   const activityCommand = new GetImportExportLog({ 'collectionName': data.collectionName });
      //   activity = await new CommandFactory().getCommand(activityCommand.path, true, activityCommand);
      // }
      const activityCommand = new GetImportExportLog({ 'collectionName': data.collectionName });
      activity = await new CommandFactory().getCommand(activityCommand.path, true, activityCommand);
      return { result: recommendations, count: recommendationsCount, activity: activity };
    })
      .catch(async (error: any) => {
        return { success: false, message: error.message };
      });
  }
}
