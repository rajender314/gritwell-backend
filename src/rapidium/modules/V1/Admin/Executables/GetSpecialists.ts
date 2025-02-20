import SpecialistDataSource
  from '@basePath/Admin/DataSource/Mongo/SpecialistDataSource';
/**
 * class GetSpecialists
 */
class GetSpecialists {
  /**
   * constructor
   */
  constructor() {}
  /**
 * @param {data} data
 * @return {Object}
 */
  async execute(data: any) {
    return await new SpecialistDataSource().getSpecialists(data);
  }
}
module.exports = GetSpecialists;
