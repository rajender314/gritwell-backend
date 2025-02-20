import ClientHappinessTypeFormDataSource from '@basePath/Typeforms/DataSource/Mongo/ClientHappinessTypeFormDataSource';
/**
 * class SyncClientHappiness
 */
class SyncClientHappiness {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new ClientHappinessTypeFormDataSource().sync(data);
    }
}
module.exports = SyncClientHappiness;
