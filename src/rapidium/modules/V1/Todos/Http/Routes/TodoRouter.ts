import * as express from 'express';
import TodoController
    from '@basePath/Todos/Http/Controller/TodoController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const todoController = new TodoController();
const middlewareFactory = new MiddlewareFactory();
const TodoRouter = express.Router();

TodoRouter.route('/clients/todos').post(
    middlewareFactory.verifyRole,
    todoController.createTodo,
); 

TodoRouter.route('/clients/todos/:client_id').get(
    middlewareFactory.verifyRole,
    todoController.getTodos,
); 

export { TodoRouter };
