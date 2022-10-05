import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../app/app.slice";
import {TodoListsService} from "../../services/todo-lists.service";
import {addTodoList, changeTodoListTitle, removeTodoList, setListStatus, setTodoLists} from "./todolists.slice";
import {handleNetworkError} from "../../utils/handleNetworkError";

export const TodoListsThunksCreators = {
    fetchTodoLists: () => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await TodoListsService.getAll()
            dispatch(setTodoLists({todoLists: response.data}))
            dispatch(setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch)
            }
        }
    },
    removeTodoList: (todoListId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setListStatus({todoListId, status: 'loading'}))
            dispatch(setAppStatus('loading'))
            const response = await TodoListsService.delete(todoListId)
            if (response.data.resultCode === 0) {
                dispatch(removeTodoList({todoListId}))
            } else {
                const errMessages = response.data.messages
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    },
    createTodoList: (title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await TodoListsService.create(title)

            if (response.data.resultCode === 0) {
                dispatch(addTodoList({newTodoList: response.data.data.item}))
            } else {
                const errMessages = response.data.messages
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch)
            }
        }
    },
    changeTitleTodoList: (todoListId: string, title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setListStatus({todoListId, status: 'loading'}))
            dispatch(setAppStatus('loading'))
            const response = await TodoListsService.update(todoListId, title)

            if (response.data.resultCode === 0) {
                dispatch(changeTodoListTitle({todoListId, newTitle: title}))
            } else {
                const errMessages = response.data.messages
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(setAppStatus('succeeded'))
            dispatch(setListStatus({todoListId, status: 'succeeded'}))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    }
}
