import TestDataSource
    from '../DataSource/Mongo/TestDataSource';
/**
 * class CreateTests
 */
class CreateTests {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new TestDataSource().create(data);
    }
}
module.exports = CreateTests;
