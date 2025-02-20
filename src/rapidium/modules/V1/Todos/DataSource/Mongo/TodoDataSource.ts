import { GetTodos }
    from '@basePath/Todos/Commands/GetTodos';
import { CreateTodo }
    from '@basePath/Todos/Commands/CreateTodo';
// import { ValidateClient }
//     from
//     '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { SalesManagerTodos }
    from
    '@basePath/Todos/DataSource/Mongo/SalesManagerTodos';
import { CareManagerTodos }
    from
    '@basePath/Todos/DataSource/Mongo/CareManagerTodos';
import { HealthCoachTodos }
    from
    '@basePath/Todos/DataSource/Mongo/HealthCoachTodos';
import { TodoSchema } from "@basePath/Todos/DataSource/Models/Schema/TodoSchema";
import { RoleSchema }
    from '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import { ClientTodosSchema } from "@basePath/Todos/DataSource/Models/Schema/ClientTodosSchema";
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class TodoDataSource
*/
export default class TodoDataSource {
    /**
     * @param {data} data GetTodos
     * @return {Object}
     */
    async get(data: GetTodos) {
        try {
            // return await TodoSchema.find({"code" : "CREATE_HEALTH_PLAN"});
            // return await TodoSchema.find({});
            let code = '';
            const role = await RoleSchema.findById(data.userData.role_id, { code: 1 });
            if (role != null) {
                code = role.code
            }
            const todos = await this.getTodos(data);
            if (code === 'sales_manager') {
                return await new SalesManagerTodos(data.client_id, todos).get();
            }
            if (code === 'care_manager') {
                return await new CareManagerTodos(data.client_id, todos).get();
            }
            if (code === 'health_coach') {
                return await new HealthCoachTodos(data.client_id, todos).get();
            }
            if (code === 'admin') {
                return todos;
            }

        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }


    async getTodos(data: GetTodos) {
        const clientTodos = await ClientTodosSchema.find({ client_id: data.client_id });
        let clientTodoData: any = [];
        if (clientTodos.length) {
            clientTodos.map(clientTodo => {
                clientTodoData[clientTodo.todo_id] = clientTodo;
            });
        }
        // const todos = await TodoSchema.find({ "role_id": "61eeb9079ba53455ee5fef71" });//SM
        // const todos = await TodoSchema.find({ "role_id": "61eeb9809ba53455ee5fefcb" });//CM
        // const todos = await TodoSchema.find({ "role_id": "61eeb9909ba53455ee5fefd6" });//HC
        const todos = await TodoSchema.aggregate([
            // {
            //     $lookup: {
            //         from: 'role_todos',
            //         localField: '_id',
            //         foreignField: 'todo_id',
            //         as: 'role_todos',
            //     }
            // },
            // {
            //     $unwind: {
            //         path: '$role_todos',
            //         preserveNullAndEmptyArrays: true,
            //     },
            // },
            // {
            //     $match: {
            //         "role_todos.role_id": ObjectId("61eeb9079ba53455ee5fef71")
            //     }
            // },
            {
                $lookup: {
                    from: 'role_todos',
                    let: { todo_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$todo_id', '$$todo_id'] },
                                        { $eq: ['$role_id', ObjectId(data.userData.role_id)] }
                                    ]
                                },
                            }
                        },
                    ],
                    as: 'role_todos',
                },
            },
            {
                $unwind: {
                    path: '$role_todos',
                    preserveNullAndEmptyArrays: false,
                },
            }
        ]);
        let todosData: any = [];
        if (todos.length) {
            todos.map(todo => {
                if (!(clientTodoData && clientTodoData[todo._id])) {
                    todosData.push({
                        todo_id: todo._id,
                        name: todo.name,
                        code: todo.code,
                        due: "Due in 6 Hours"
                    });
                }
            });
        }
        return todosData;
    }

    /**
    * @param {data} data CreateTodo
    * @return {Object}
    */
    async create(data: CreateTodo) {
        try {
            const todo = await TodoSchema.findOne({ code: data.action });
            if (todo != null) {
                const clientTodo = await ClientTodosSchema.findOne({ client_id: data.client_id, todo_id: todo._id });
                if (clientTodo == null) {
                    return await ClientTodosSchema.create({
                        client_id: data.client_id,
                        todo_id: todo._id
                    });
                } else {
                    throw new ResourceNotFound('Todo already completed', '');
                }
            }
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
}
