import SettingsDataSource
  from '@basePath/Settings/DataSource/Mongo/SettingsDataSource';
/**
 * Executable file for SaveEmailDetails
 */
class SaveEmailDetails {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new SettingsDataSource().saveEmailDetails(data);
  }
}
module.exports = SaveEmailDetails;
