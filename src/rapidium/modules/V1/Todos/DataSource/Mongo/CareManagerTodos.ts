
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class CareManagerTodos
*/
export class CareManagerTodos {
    public clientId: string;
    public todos: any;
    constructor(clientId, todos) {
        this.clientId = clientId;
        this.todos = todos;
    }
    async get() {
        console.log(this.clientId, this.todos);
        return this.todos;
    }
}