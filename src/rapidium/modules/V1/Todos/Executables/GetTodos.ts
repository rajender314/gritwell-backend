import TodoDataSource
    from '../DataSource/Mongo/TodoDataSource';
/**
 * class GetTodos
 */
class GetTodos {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new TodoDataSource().get(data);
    }
}
module.exports = GetTodos;
