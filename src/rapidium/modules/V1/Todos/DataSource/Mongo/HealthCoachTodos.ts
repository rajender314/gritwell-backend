
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class HealthCoachTodos
*/
export class HealthCoachTodos {
    public clientId: string;
    public todos: any;
    constructor(clientId, todos) {
        this.clientId = clientId;
        this.todos = todos;
    }
    async get() {
        return this.todos;
    }
}