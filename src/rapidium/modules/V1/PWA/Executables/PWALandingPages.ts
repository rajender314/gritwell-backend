import PWALandingPagesDataSource
  from '@basePath/PWA/DataSource/Mongo/PWALandingPagesDataSource';
/**
 * Executable file for PWALandingPages
 */
class PWALandingPages {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new PWALandingPagesDataSource().pwaLandingPages(data);
  }
}

module.exports = PWALandingPages;
