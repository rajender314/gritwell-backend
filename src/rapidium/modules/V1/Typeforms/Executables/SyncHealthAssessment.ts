import HealthAssessmentTypeFormDataSource from '@basePath/Typeforms/DataSource/Mongo/HealthAssessmentTypeFormDataSource';
/**
 * class SyncHealthAssessment
 */
class SyncHealthAssessment {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new HealthAssessmentTypeFormDataSource().sync(data);
    }
}
module.exports = SyncHealthAssessment;
