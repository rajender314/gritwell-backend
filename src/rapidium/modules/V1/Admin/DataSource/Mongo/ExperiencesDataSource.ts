import Experience from '@basePath/Admin/DataSource/Models/Experience';
import {ExperienceSchema}
  from '@basePath/Admin/DataSource/Models/Schema/ExperienceSchema';
/**
 * class ExperiencesDataSource
 */
export default class ExperiencesDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async getExperiences(data: any) {
    return new Experience(ExperienceSchema).getExperiences(data);
  }
}
