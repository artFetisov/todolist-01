import {RequestStatusType} from "./app.types";

export interface ITasks {
    [key: string]: ITask[]
}

export interface IUpdateTaskModel {
    title?: string
    description: string
    status?: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}

export enum TaskStatuses {
    NEW = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    DRAFT = 3
}

export enum TaskPriorities {
    LOW = 0,
    MIDDLE = 1,
    HI = 2,
    URGENTLY = 3,
    LATER = 4
}

export interface ITaskResponse {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export interface ITask extends ITaskResponse {
    entityStatus: RequestStatusType
}
