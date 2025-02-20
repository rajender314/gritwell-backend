import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { GetTodos } from '@basePath/Todos/Commands/GetTodos';
import { CreateTodo } from '@basePath/Todos/Commands/CreateTodo';
/**
 * class TodoController
 */
export default class TodoController extends BaseController {
    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async getTodos(req: Request, res: Response, next: any) {
        const getCommand = new GetTodos(req);
        await new BaseController().run(
            getCommand.path,
            getCommand,
            res,
            true,
            false,
            next,
            req,
        );
    }

    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async createTodo(req: Request, res: Response, next: any) {
        const getCommand = new CreateTodo(req);
        await new BaseController().run(
            getCommand.path,
            getCommand,
            res,
            true,
            false,
            next,
            req,
        );
    }
}
