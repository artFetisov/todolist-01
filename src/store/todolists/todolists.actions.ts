import {setAppError, setAppStatus} from "../app/app.slice";
import {TodoListsService} from "../../services/todo-lists.service";
import {addTodoList, changeTodoListTitle, removeTodoList, setListStatus, setTodoLists} from "./todolists.slice";
import {handleNetworkError} from "../../utils/handleNetworkError";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTodoListsTC = createAsyncThunk('todoList/getAll', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await TodoListsService.getAll()
        dispatch(setTodoLists({todoLists: response.data}))
        dispatch(setAppStatus('succeeded'))
    } catch (error) {
        if (error instanceof Error) {
            handleNetworkError(error.message, dispatch)
            return rejectWithValue(error.message)
        }
    }
})

export const removeTodoListTC = createAsyncThunk('todoList/remove', async (todoListId: string, {
        dispatch,
        rejectWithValue
    }) => {
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
                return rejectWithValue(error.message)
            }
        }
    }
)

export const createTodoListTC = createAsyncThunk('todoList/create', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
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
            return rejectWithValue(error.message)
        }
    }
})

export const changeTodoListTC = createAsyncThunk<void, { todoListId: string, title: string }>('todoList/change',
    async ({todoListId, title}, {dispatch, rejectWithValue}) => {
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
                return rejectWithValue(error.message)
            }
        }
    })
