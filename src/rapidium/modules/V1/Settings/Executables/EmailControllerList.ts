import SettingsDataSource
  from '@basePath/Settings/DataSource/Mongo/SettingsDataSource';
/**
 * Executable file for Settings
 */
class Settings {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object} data, success and message
 */
  async execute(data: any) {
    return await new SettingsDataSource().emailControllerData(data);
  }
}
module.exports = Settings;
