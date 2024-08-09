import { Todo } from "../models/todo.model";

export interface TodoResponse {
    code: number,
    body: Todo[]
}
