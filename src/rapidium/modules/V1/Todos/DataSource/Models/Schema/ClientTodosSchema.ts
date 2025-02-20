import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

interface IClientTodo extends Document {
    id: string;
    client_id: string;
    todo_id: string;
}
const Schema = mongoose.Schema;

const todos = new Schema<IClientTodo>(
    {
        id: { type: String },
        client_id: { type: String },
        todo_id: { type: String },
    },
);
const ClientTodosSchema = mongoose.model<IClientTodo>('customer_todos', todos);
export { ClientTodosSchema };
