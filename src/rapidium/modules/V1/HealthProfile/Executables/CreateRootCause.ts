import ClientRootCauseDataSource
    from '../DataSource/Mongo/ClientRootCauseDataSource';
/**
 * class CreateRootCause
 */
class CreateRootCause {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new ClientRootCauseDataSource().create(data);
    }
}
module.exports = CreateRootCause;
