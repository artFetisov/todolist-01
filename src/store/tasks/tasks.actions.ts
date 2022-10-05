import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../app/app.slice";
import {TasksService} from "../../services/tasks.service";
import {addTask, changeTask, removeTask, setEntityStatus, setTasks} from "./tasks.slice";
import {handleNetworkError} from "../../utils/handleNetworkError";
import {setListStatus} from "../todolists/todolists.slice";
import {ITask, IUpdateTaskModel, TaskStatuses} from "../../types/task.types";
import {AppRootState} from "../index";

export const TasksThunkCreators = {
    fetchTasks: (todoListId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await TasksService.getAll(todoListId)
            if (response.data.error === null) {
                dispatch(setTasks({todoListId, tasks: response.data.items}))
                dispatch(setAppStatus('succeeded'))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    },
    createTask: (todoListId: string, title: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setListStatus({todoListId, status: 'loading'}))
            dispatch(setAppStatus('loading'))
            const response = await TasksService.create(todoListId, title)

            if (response.data.resultCode === 0) {
                const newTask: ITask = {
                    ...response.data.data.item,
                    entityStatus: 'idle'
                }
                dispatch(addTask(newTask))
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
    },
    removeTask: (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'loading'}))
            dispatch(setAppStatus('loading'))
            const response = await TasksService.delete(todoListId, taskId)
            if (response.data.resultCode === 0) {
                dispatch(removeTask({todoListId, taskId}))
            } else {
                const errMessages = response.data.messages
                dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
            }
            dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'succeeded'}))
            dispatch(setAppStatus('succeeded'))
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    },
    updateTask: (todoListId: string, taskId: string, newObj: { status: TaskStatuses } | { title: string }) =>
        async (dispatch: Dispatch, getState: () => AppRootState) => {
            try {
                dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'loading'}))
                dispatch(setAppStatus('loading'))
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
                    dispatch(changeTask({...response.data.data.item, entityStatus: 'idle'}))
                } else {
                    const errMessages = response.data.messages
                    dispatch(setAppError(errMessages.length > 0 ? errMessages[0] : 'Some error occurred'))
                }
                dispatch(setEntityStatus({todoListId, taskId, entityStatus: 'succeeded'}))
                dispatch(setAppStatus('succeeded'))
            } catch (error) {
                if (error instanceof Error) {
                    handleNetworkError(error.message, dispatch, todoListId)
                }
            }
        }
}