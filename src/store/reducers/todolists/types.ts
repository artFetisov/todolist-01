import {FilterValuesType, ITodoListFetch, TodoListType} from "../../../types/todo-list.types";
import {RequestStatusType} from "../../../types/app.types";

export type TodoListStateType = TodoListType

export enum TodoListActionEnum {
    REMOVE_TODO_LIST = 'REMOVE-TODO-LIST',
    ADD_TODO_LIST = 'ADD-TODO-LIST',
    CHANGE_TODO_LIST_TITLE = 'CHANGE-TODO-LIST-TITLE',
    CHANGE_TODO_LIST_FILTER = 'CHANGE-TODO-LIST-FILTER',
    SET_TODO_LISTS = 'SET-TODO-LISTS',
    SET_LIST_STATUS = 'SET-LIST-STATUS'
}

export interface SetListStatusAction {
    type: TodoListActionEnum.SET_LIST_STATUS,
    payload: {
        todoListId: string,
        status: RequestStatusType
    }
}

export interface SetTodoListsAction {
    type: TodoListActionEnum.SET_TODO_LISTS,
    payload: {
        todoLists: ITodoListFetch[]
    }
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
        newTodoList: ITodoListFetch
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
    | SetTodoListsAction
    | SetListStatusAction