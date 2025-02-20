import { ImportExportLog } from '@basePath/ImportExportLogs/Commands/ImportExportLog';
import { GetImportExportLog }
    from '@basePath/ImportExportLogs/Commands/GetImportExportLog';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ImportExportLogSchema }
    from '@basePath/ImportExportLogs/DataSource/Models/Schema/ImportExportLogSchema';
/**
 * class ImportExportLogDataSource
 */
export default class ImportExportLogDataSource {
    /**
     * @param {data} data ImportExportLog
     * @return {Object}
     */
    async create(data: ImportExportLog) {
        try {
            return await ImportExportLogSchema.create(data)
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    async getActivity(data: GetImportExportLog) {
        return await ImportExportLogSchema.aggregate([
            { $sort: { 'created_date': -1 } },
            { $match: { 'collectionName': data.collectionName } },
            { $limit: 1 },
            {
                $lookup: {
                    from: 'office_users',
                    localField: 'created_by',
                    foreignField: 'user_id',
                    as: 'user_data',
                },
            },
            { $unwind: { path: '$user_data', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    id: 1,
                    first_name: '$user_data.first_name',
                    last_name: '$user_data.last_name',
                    action: 1,
                    created_date: 1,
                },
            },
        ]).then(importExports => {
            let activity: any = {};
            if (importExports[0]) {
                const info = importExports[0];
                const type = info.action === 'upload' ? 'Uploaded' : 'Downloaded';
                const name = `${info.first_name} ${info.last_name}`;
                const date = info.created_date;
                activity = { type, name, date };
            }
            return activity;
        })
    }
}
