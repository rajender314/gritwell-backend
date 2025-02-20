import SymptomAnalysisTypeFormDataSource from '@basePath/Typeforms/DataSource/Mongo/SymptomAnalysisTypeFormDataSource';
/**
 * class SyncSymptomAnalysis
 */
class SyncSymptomAnalysis {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new SymptomAnalysisTypeFormDataSource().sync(data);
    }
}
module.exports = SyncSymptomAnalysis;
