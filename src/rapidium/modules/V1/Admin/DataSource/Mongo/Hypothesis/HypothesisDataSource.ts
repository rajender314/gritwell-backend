import { Hypothesis } from '@basePath/Admin/Commands/Hypothesis';
import { GetImportExportLog }
    from '@basePath/ImportExportLogs/Commands/GetImportExportLog';
import {
    IHypothesis,
    IHypothesisResponseData
} from '@basePath/Admin/Interfaces/IHypothesis';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
/**
 * class HypothesisDataSource
 */
export default class HypothesisDataSource {

    /**
   * get
   * @param {data} data
   * @return {Object}
   */
    async get(data: Hypothesis) {
        const skip = (data.page - 1) * data.perPage;
        const limit = data.perPage;
        const search = data.search.replace(/\s+/g, ' ').trim();
        let sort = (data.sort == 'DESC') ? -1 : 1;
        const searchQry = {};

        if (data.search != '') {
            Object.assign(searchQry, {
                $or: [
                    { 'name': { $regex: `.*${search}.*`, $options: 'i' } },
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
                                'uuid': 1,
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
        ]).then(async (hypothesisData: IHypothesisResponseData[]) => {
            const activityCommand = new GetImportExportLog({ 'collectionName': data.collectionName });
            const activity = await new CommandFactory().getCommand(activityCommand.path, true, activityCommand);
            const hypotheses: IHypothesis[] = hypothesisData[0].paginated_results;
            const hypothesisCount: number =
                hypothesisData[0].total_count &&
                    hypothesisData[0].total_count[0] &&
                    hypothesisData[0].total_count[0].count ?
                    hypothesisData[0].total_count[0].count :
                    0;
            return { result: hypotheses, count: hypothesisCount, activity: activity };
        })
            .catch(async (error: any) => {
                return { success: false, message: error.message };
            });
    }
}
