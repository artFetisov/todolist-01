export interface ITodoItem {
    id: string
    title: string
    isDone: boolean
}

export interface ITasks {
    [key: string]: ITodoItem[]
}

export interface ITodoList {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'