import {FilterValuesType} from "../../components/ui/todolist/todolist.types";

export interface ITodoListState {
    id: string
    title: string
    filter: FilterValuesType
}

export enum TodoListActionEnum {
    REMOVE_TODO_LIST = 'REMOVE-TODO-LIST',
    ADD_TODO_LIST = 'ADD-TODO-LIST',
    CHANGE_TODO_LIST_TITLE = 'CHANGE-TODO-LIST-TITLE',
    CHANGE_TODO_LIST_FILTER = 'CHANGE_TODO_LIST_FILTER'
}

export interface RemoveTodoListAction {
    type: TodoListActionEnum.REMOVE_TODO_LIST,
    payload: {
        todoListID: string
    }
}

export interface AddTodoListAction {
    type: TodoListActionEnum.ADD_TODO_LIST,
    payload: {
        newTodoListTitle: string,
        todoListId: string
    }
}

export interface ChangeTodoListTitleAction {
    type: TodoListActionEnum.CHANGE_TODO_LIST_TITLE,
    payload: {
        todoListID: string,
        newTitle: string
    }
}

export interface ChangeTodoListFilterAction {
    type: TodoListActionEnum.CHANGE_TODO_LIST_FILTER,
    payload: {
        todoListID: string,
        newFilter: FilterValuesType
    }
}

export type TodoListActions =
    RemoveTodoListAction
    | AddTodoListAction
    | ChangeTodoListTitleAction
    | ChangeTodoListFilterAction