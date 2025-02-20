import { DateFormat } from '@basePath/Master/Commands/DateFormat';
import { DateFormatSchema }
    from '@basePath/Master/DataSource/Models/Schema/DateFormatSchema';
/**
 * class MasterDataSource
 */
export default class MasterDataSource {
    /**
      * @param {data} data
     * @return {Object}
     */
    async get(data: DateFormat) {
        let format = '';
        const dateFormat = await DateFormatSchema.findOne({ status: true }, { _id: 0, format: 1 });
        if (dateFormat != null) {
            format = dateFormat.format;
        }
        return format;
    }
}
