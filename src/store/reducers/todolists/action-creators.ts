import {
    AddTodoListAction,
    ChangeTodoListFilterAction,
    ChangeTodoListTitleAction,
    RemoveTodoListAction, SetListStatusAction,
    SetTodoListsAction,
    TodoListActionEnum
} from "./types";
import {FilterValuesType, ITodoListFetch} from "../../../types/todo-list.types";
import {Dispatch} from "redux";
import {TodoListsService} from "../../../services/todo-lists.service";
import {AppActionCreators} from "../app/action-creators";
import {RequestStatusType} from "../../../types/app.types";

export const TodoListsActionCreators = {
    removeTodoList: (todoListID: string): RemoveTodoListAction => ({
        type: TodoListActionEnum.REMOVE_TODO_LIST,
        payload: {todoListID}
    }),
    addTodoList: (newTodoList: ITodoListFetch): AddTodoListAction => ({
        type: TodoListActionEnum.ADD_TODO_LIST,
        payload: {newTodoList}
    }),
    changeTodoListTitle: (todoListID: string, newTitle: string): ChangeTodoListTitleAction => ({
        type: TodoListActionEnum.CHANGE_TODO_LIST_TITLE,
        payload: {todoListID, newTitle}
    }),
    changeTodoListFilter: (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterAction => ({
        type: TodoListActionEnum.CHANGE_TODO_LIST_FILTER,
        payload: {todoListID, newFilter}
    }),
    setTodoLists: (todoLists: ITodoListFetch[]): SetTodoListsAction => ({
        type: TodoListActionEnum.SET_TODO_LISTS,
        payload: {todoLists}
    }),
    setListStatus: (todoListId: string, status: RequestStatusType): SetListStatusAction => ({
        type: TodoListActionEnum.SET_LIST_STATUS,
        payload: {
            todoListId,
            status
        }
    })
}

export const TodoListsThunksCreators = {
    fetchTodoLists: () => async (dispatch: Dispatch) => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.getAll()
            dispatch(TodoListsActionCreators.setTodoLists(response.data))
            dispatch(AppActionCreators.setAppStatus('succeeded'))
        } catch (error) {
            console.log(error)
        }
    },
    removeTodoList: (todoListId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'loading'))
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.delete(todoListId)
            dispatch(TodoListsActionCreators.removeTodoList(todoListId))
            dispatch(AppActionCreators.setAppStatus('succeeded'))
        } catch (error) {
            console.log(error)
        }
    },
    createTodoList: (title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.create(title)
            dispatch(TodoListsActionCreators.addTodoList(response.data.data.item))
            dispatch(AppActionCreators.setAppStatus('succeeded'))
        } catch (error) {
            dispatch(AppActionCreators.setAppStatus('failed'))
            console.log(error)
        }
    },
    changeTitleTodoList: (todoListId: string, title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'loading'))
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.update(todoListId, title)
            dispatch(TodoListsActionCreators.changeTodoListTitle(todoListId, title))
            dispatch(AppActionCreators.setAppStatus('succeeded'))
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'succeeded'))
        } catch (error) {
            console.log(error)
        }
    }
}
