import DateFormatDataSource
  from '@basePath/Master/DataSource/Mongo/DateFormatDataSource';
/**
 * class DateFormat
 */
class DateFormat {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new DateFormatDataSource().get(data);
  }
}
module.exports = DateFormat;
