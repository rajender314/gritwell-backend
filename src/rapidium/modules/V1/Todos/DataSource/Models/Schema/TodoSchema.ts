import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

interface ITodo extends Document {
    id: string;
    name: string;
    code: string;
    status: boolean;
}
const Schema = mongoose.Schema;

const todos = new Schema<ITodo>(
    {
        id: { type: String },
        name: { type: String },
        code: { type: String },
        status: { type: Boolean }
    },
);
const TodoSchema = mongoose.model<ITodo>('Todo', todos);
export { TodoSchema };
