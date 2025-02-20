import SchedulesDataSource from '../DataSource/Mongo/SchedulesDataSource';
/**
 * class Schedules
 */
class Schedules {
  /**
   * constructor
   */
  constructor() { }
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new SchedulesDataSource().get(data);
  }
}

module.exports = Schedules;
