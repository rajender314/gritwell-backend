import PWALandingPagesDataSource
  from '@basePath/PWA/DataSource/Mongo/PWALandingPagesDataSource';
/**
 * class PwaSignInDocs
 */
class PwaSignInDocs {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new PWALandingPagesDataSource().pwaSignInDocs(data);
  }
}


module.exports = PwaSignInDocs;
