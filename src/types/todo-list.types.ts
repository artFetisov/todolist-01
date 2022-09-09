import {RequestStatusType} from "./app.types";

export interface ITodoListFetch {
    id: string
    addedDate: string
    order: number
    title: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = ITodoListFetch & {
    filter: FilterValuesType
    listStatus: RequestStatusType
}