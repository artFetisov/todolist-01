import {
    AddTaskAction, ChangeTask,
    RemoveTaskAction,
    SetTasksAction,
    TasksActionEnum,
} from "./types";
import {ITask, IUpdateTaskModel, TaskStatuses} from "../../../types/task.types";
import {TasksService} from "../../../services/tasks.service";
import {AppRootState, AppRootThunk} from "../../index";
import {AppActionCreators} from "../app/action-creators";
import {TodoListsActionCreators} from "../todolists/action-creators";
import {handleNetworkError} from "../../../utils/handleNetworkError";

export const TasksActionCreators = {
    removeTask: (todoListId: string, taskId: string): RemoveTaskAction => ({
        type: TasksActionEnum.REMOVE_TASK,
        payload: {todoListId, taskId}
    }),
    addTask: (task: ITask): AddTaskAction => ({
        type: TasksActionEnum.ADD_TASK,
        payload: {task}
    }),
    changeTask: (task: ITask): ChangeTask => ({
        type: TasksActionEnum.CHANGE_TASK,
        payload: {
            task
        }
    }),
    setTasks: (todoListId: string, tasks: ITask[]): SetTasksAction => ({
        type: TasksActionEnum.SET_TASKS,
        payload: {
            todoListId, tasks
        }
    })
}

export const TasksThunkCreators = {
    fetchTasks: (todoListId: string): AppRootThunk => async dispatch => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TasksService.getAll(todoListId)
            if (response.data.error === null) {
                dispatch(TasksActionCreators.setTasks(todoListId, response.data.items))
                dispatch(AppActionCreators.setAppStatus('succeeded'))
            }
        } catch (error) {
            if (error instanceof Error) {
                handleNetworkError(error.message, dispatch, todoListId)
            }
        }
    },
    createTask: (todoListId: string, title: string): AppRootThunk => async dispatch => {
        try {
            dispatch(TodoListsActionCreators.setListStatus(todoListId, 'loading'))
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TasksService.create(todoListId, title)

            if (response.data.resultCode === 0) {
                dispatch(TasksActionCreators.addTask(response.data.data.item))
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
    },
    removeTask: (todoListId: string, taskId: string): AppRootThunk => async dispatch => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'))
            const response = await TasksService.delete(todoListId, taskId)

            if (response.data.resultCode === 0) {
                dispatch(TasksActionCreators.removeTask(todoListId, taskId))
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
    updateTask: (todoListId: string, taskId: string, newObj: { status: TaskStatuses } | { title: string }): AppRootThunk =>
        async (dispatch, getState: () => AppRootState) => {
            try {
                dispatch(AppActionCreators.setAppStatus('loading'))
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
                    dispatch(TasksActionCreators.changeTask(response.data.data.item))
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
        }
}