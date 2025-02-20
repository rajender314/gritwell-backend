import SupplementDataSource
    from '../DataSource/Mongo/SupplementDataSource';
/**
 * class CreateSupplements
 */
class CreateSupplements {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new SupplementDataSource().create(data);
    }
}
module.exports = CreateSupplements;
