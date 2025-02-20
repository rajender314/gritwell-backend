import SyncSetConsentDataSource
  from '@basePath/Api/DataSource/Mongo/SyncSetConsentDataSource';
/**
 * class SyncSetConsent
 */
class SyncSetConsent {
  /**
   * constructor
   */
  constructor() { }
  /**
  * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SyncSetConsentDataSource().syncSetConsent(data);
  }
}
module.exports = SyncSetConsent;
