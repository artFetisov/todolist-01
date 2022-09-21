import {instance, IResponse} from "../api/api.config";
import {ITodoListFetch} from "../types/todo-list.types";

export const TodoListsService = {
    async getAll() {
        return instance.get<ITodoListFetch[]>('todo-lists')
    },
    async create(title: string) {
        return instance.post<IResponse<{ item: ITodoListFetch }>>('todo-lists', {title})
    },
    async update<IResponse>(todoListId: string, title: string) {
        return instance.put(`todo-lists/${todoListId}`, {title})
    },
    async delete<IResponse>(todoListId: string) {
        return instance.delete(`todo-lists/${todoListId}`)
    }
}