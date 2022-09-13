import {
    AddTodoListAction,
    ChangeTodoListFilterAction,
    ChangeTodoListTitleAction,
    RemoveTodoListAction, SetListStatusAction,
    SetTodoListsAction,
    TodoListActionEnum
} from "./types";
import {FilterValuesType, ITodoListFetch} from "../../../types/todo-list.types";
import {TodoListsService} from "../../../services/todo-lists.service";
import {AppActionCreators} from "../app/action-creators";
import {RequestStatusType} from "../../../types/app.types";
import {AppRootThunk} from "../../index";
import {handleNetworkError} from "../../../utils/handleNetworkError";

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
    fetchTodoLists: (): AppRootThunk => async dispatch => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.getAll()
            dispatch(TodoListsActionCreators.setTodoLists(response.data))
            dispatch(AppActionCreators.setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch)
            }
        }
    },
    removeTodoList: (todoListId: string): AppRootThunk => async dispatch => {
        try {
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'loading'))
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.delete(todoListId)
            if (response.data.resultCode === 0) {
                dispatch(TodoListsActionCreators.removeTodoList(todoListId))
            } else {
                const errMessages = response.data.messages
                dispatch(AppActionCreators.setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(AppActionCreators.setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    },
    createTodoList: (title: string): AppRootThunk => async dispatch => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.create(title)

            if (response.data.resultCode === 0) {
                dispatch(TodoListsActionCreators.addTodoList(response.data.data.item))
            } else {
                const errMessages = response.data.messages
                dispatch(AppActionCreators.setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(AppActionCreators.setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch)
            }
        }
    },
    changeTitleTodoList: (todoListId: string, title: string): AppRootThunk => async dispatch => {
        try {
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'loading'))
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TodoListsService.update(todoListId, title)

            if (response.data.resultCode === 0) {
                dispatch(TodoListsActionCreators.changeTodoListTitle(todoListId, title))
            } else {
                const errMessages = response.data.messages
                dispatch(AppActionCreators.setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(AppActionCreators.setAppStatus('succeeded'))
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    }
}
