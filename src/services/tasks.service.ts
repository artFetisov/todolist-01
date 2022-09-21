import {IGetTasksResponse, instance, IResponse} from "../api/api.config";
import {ITask, ITaskResponse, IUpdateTaskModel} from "../types/task.types";

export const TasksService = {
    async getAll(todoListId: string) {
        return instance.get<IGetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },
    async create(todoListId: string, title: string) {
        return instance.post<IResponse<{ item: ITaskResponse }>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    async update(todoListId: string, taskId: string, task: IUpdateTaskModel) {
        return instance.put<IResponse<{ item: ITaskResponse }>>(`todo-lists/${todoListId}/tasks/${taskId}`, task)
    },
    async delete(todoListId: string, taskId: string) {
        return instance.delete<IResponse>(`todo-lists/${todoListId}/tasks/${taskId}`)
    }
}