import TodoDataSource
    from '../DataSource/Mongo/TodoDataSource';
/**
 * class CreateTodo
 */
class CreateTodo {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new TodoDataSource().create(data);
    }
}
module.exports = CreateTodo;
