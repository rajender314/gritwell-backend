import IntakeTypeFormDataSource from '@basePath/Typeforms/DataSource/Mongo/IntakeTypeFormDataSource';
/**
 * class SyncIntake
 */
class SyncIntake {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new IntakeTypeFormDataSource().sync(data);
    }
}
module.exports = SyncIntake;
