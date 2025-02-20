import DownloadSymptomAnalysisDataSource
  from '@basePath/Customer/DataSource/Mongo/DownloadSymptomAnalysisDataSource';
/**
 * class DownloadSymptomAnalysis
 */
class DownloadSymptomAnalysis {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    // eslint-disable-next-line
    return await new DownloadSymptomAnalysisDataSource().downloadSymptomAnalysis(
        data,
    );
  }
}

module.exports = DownloadSymptomAnalysis;
