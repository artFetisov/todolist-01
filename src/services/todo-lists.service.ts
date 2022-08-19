import {instance, IResponse} from "../api/api.config";
import {ITodoList} from "../types/todo-list.types";

export const TodoListsService = {
    async getAll() {
        return instance.get<ITodoList[]>('todo-lists')
    },
    async create(title: string) {
        return instance.post<IResponse<ITodoList>>('todo-lists', {title})
    },
    async update<IResponse>(todoListId: string, title: string) {
        return instance.put(`todo-lists/${todoListId}`, {title})
    },
    async delete<IResponse>(todoListId: string) {
        return instance.delete(`todo-lists/${todoListId}`)
    }
}