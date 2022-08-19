export interface ITodoList {
    id: string
    addedDate: string
    order: number
    title: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = ITodoList & {
    filter: FilterValuesType
}