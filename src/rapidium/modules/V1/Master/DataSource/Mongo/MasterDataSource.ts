import {GetMaster} from '@basePath/Master/Commands/GetMaster';
import {GetSpecialists} from '@basePath/Admin/Commands/GetSpecialists';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {ExperienceSchema}
  from '@basePath/Admin/DataSource/Models/Schema/ExperienceSchema';
import {TimeZoneSchema}
  from '@basePath/Admin/DataSource/Models/Schema/TimeZoneSchema';
import {WeekDaySchema}
  from '@basePath/Admin/DataSource/Models/Schema/WeekDaySchema';
/**
 * class MasterDataSource
 */
export default class MasterDataSource {
  /**
    * @param {data} data
   * @return {Object}
   */
  async getMasters(data: GetMaster) {
    let experiences: any = [];
    let specialists: any = [];
    let timezones: any = [];
    let weekdays: any = [];
    const type = data.type.split(',');
    if (type.includes('experiences')) {
      experiences = await ExperienceSchema.find(
          {},
          {_id: 1, value: '$_id', label: '$name'},
      ).then((experience) => {
        return experience;
      });
    }
    if (type.includes('timezones')) {
      timezones = await TimeZoneSchema.find(
          {},
          {
            _id: 1,
            value: '$_id',
            label: '$code',
            offset_value: 1,
            code: 1,
            utc_offset: 1,
            gmt_offset: 1,
          },
      ).then((timezone) => {
        return timezone;
      });
    }
    if (type.includes('specialists')) {
      const specialistCommand = new GetSpecialists({body: {status: true}});
      specialists = await new CommandFactory().getCommand(
          specialistCommand.path,
          true,
          specialistCommand,
      );
    }
    if (type.includes('weekdays')) {
      weekdays = await WeekDaySchema.find(
          {},
          {_id: 1, value: '$_id', label: '$name'},
      ).then((weekday) => {
        return weekday;
      });
    }
    return {experiences, specialists, timezones, weekdays};
  }
}
