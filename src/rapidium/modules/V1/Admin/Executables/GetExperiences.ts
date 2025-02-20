import ExperiencesDataSource
  from '@basePath/Admin/DataSource/Mongo/ExperiencesDataSource';
/**
 * class GetExperiences
 */
class GetExperiences {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new ExperiencesDataSource().getExperiences(data);
  }
}
module.exports = GetExperiences;
