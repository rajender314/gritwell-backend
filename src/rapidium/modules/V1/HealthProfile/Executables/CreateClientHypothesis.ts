import ClientHypothesisDataSource
    from '../DataSource/Mongo/ClientHypothesisDataSource';
/**
 * class CreateClientHypothesis
 */
class CreateClientHypothesis {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new ClientHypothesisDataSource().create(data);
    }
}
module.exports = CreateClientHypothesis;
