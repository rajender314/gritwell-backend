import DownloadIntakeFormDataSource
  from '@basePath/Customer/DataSource/Mongo/DownloadIntakeFormDataSource';
/**
 * class DownloadIntakeForm
 */
class DownloadIntakeForm {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new DownloadIntakeFormDataSource().downloadIntakeForm(data);
  }
}

module.exports = DownloadIntakeForm;
