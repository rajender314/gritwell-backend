import ApiDataSource from '@basePath/Api/DataSource/Mongo/ApiDataSource';
/**
 * class SyncTypeFormResonse
 */
class SyncTypeFormResonse {
  /**
   * constructor
   */
  constructor() { }
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ApiDataSource().syncTypeFormResonse(data);
  }
}
module.exports = SyncTypeFormResonse;
