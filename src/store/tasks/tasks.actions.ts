import {setAppError, setAppStatus} from "../app/app.slice";
import {TasksService} from "../../services/tasks.service";
import {setEntityStatus} from "./tasks.slice";
import {handleNetworkError} from "../../utils/handleNetworkError";
import {setListStatus} from "../todolists/todolists.slice";
import {ITask, IUpdateTaskData, IUpdateTaskModel} from "../../types/task.types";
import {AppRootState} from "../index";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTasksTC = createAsyncThunk<{ todoListId: string, tasks: ITask[] } | undefined, { todoListId: string }>('tasks/fetch',
    async ({todoListId}, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus('loading'))
        try {
            const response = await TasksService.getAll(todoListId)
            if (response.data.error === null) {
                dispatch(setAppStatus('succeeded'))
                return {todoListId, tasks: response.data.items}
            } else {
                dispatch(setAppStatus('failed'))
                dispatch(setAppError(response.data.error))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
                return rejectWithValue(error.message)
            }
        }
    })

export const createTaskTC = createAsyncThunk<ITask | undefined, { todoListId: string, title: string }>('tasks/create',
    async ({todoListId, title}, {dispatch, rejectWithValue}) => {
        dispatch(setListStatus({todoListId, status: 'loading'}))
        dispatch(setAppStatus('loading'))
        try {
            const response = await TasksService.create(todoListId, title)

            if (response.data.resultCode === 0) {
                const newTask: ITask = {
                    ...response.data.data.item,
                    entityStatus: 'idle'
                }
                dispatch(setAppStatus('succeeded'))
                dispatch(setListStatus({todoListId, status: 'succeeded'}))
                return newTask
            } else {
                const errMessages = response.data.messages
                dispatch(setAppStatus('failed'))
                dispatch(setListStatus({todoListId, status: 'failed'}))
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
                return rejectWithValue(error.message)
            }
        }
    })

export const removeTaskTC = createAsyncThunk<{ todoListId: string, taskId: string } | undefined, { todoListId: string, taskId: string }>('tasks/remove',
    async ({todoListId, taskId}, {dispatch, rejectWithValue}) => {
        dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'loading'}))
        dispatch(setAppStatus('loading'))
        try {
            const response = await TasksService.delete(todoListId, taskId)
            if (response.data.resultCode === 0) {
                dispatch(setAppStatus('succeeded'))
                dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'succeeded'}))
                return {todoListId, taskId}
            } else {
                const errMessages = response.data.messages
                dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'failed'}))
                dispatch(setAppStatus('failed'))
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
                return rejectWithValue(error.message)
            }
        }
    })


export const updateTaskTC = createAsyncThunk<ITask | undefined, IUpdateTaskData, { state: AppRootState }>('tasks/update',
    async ({todoListId, taskId, newObj}, {dispatch, rejectWithValue, getState}) => {
        dispatch(setAppStatus('loading'))
        dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'loading'}))
        try {
            const task = getState().tasks[todoListId].find(t => t.id === taskId)

            if (!task) return

            const model: IUpdateTaskModel = {
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                title: task.title,
                status: task.status,
                ...newObj
            }
            const response = await TasksService.update(todoListId, taskId, model)

            if (response.data.resultCode === 0) {
                dispatch(setAppStatus('succeeded'))
                dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'succeeded'}))
                return {...response.data.data.item, entityStatus: 'idle'}
            } else {
                const errMessages = response.data.messages
                dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'failed'}))
                dispatch(setAppStatus('failed'))
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
                return rejectWithValue(error.message)
            }
        }
    })
