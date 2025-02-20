import MasterDataSource
  from '@basePath/Master/DataSource/Mongo/MasterDataSource';
/**
 * class GetMaster
 */
class GetMaster {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new MasterDataSource().getMasters(data);
  }
}
module.exports = GetMaster;
