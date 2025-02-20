import Specialist from '@basePath/Admin/DataSource/Models/Specialist';
import {SpecialistSchema}
  from '@basePath/Admin/DataSource/Models/Schema/SpecialistSchema';
/**
 * class SpecialistDataSource
 */
export default class SpecialistDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async getSpecialists(data: any) {
    return new Specialist(SpecialistSchema).getSpecialists(data);
  }
}
