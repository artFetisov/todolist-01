import {AddTodoListAction, RemoveTodoListAction} from "../todolists/types";
import {ITask, TaskStatuses} from "../../../types/task.types";

export interface ITasksState {
    [key: string]: ITask[]
}

export enum TasksActionEnum {
    REMOVE_TASK = 'REMOVE-TASK',
    ADD_TASK = 'ADD-TASK',
    CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
    CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
}

export interface RemoveTaskAction {
    type: TasksActionEnum.REMOVE_TASK,
    payload: {
        todoListId: string,
        taskId: string
    }

}

export interface AddTaskAction {
    type: TasksActionEnum.ADD_TASK,
    payload: {
        todoListId: string,
        taskTitle: string
    }

}

export interface ChangeTaskStatusAction {
    type: TasksActionEnum.CHANGE_TASK_STATUS,
    payload: {
        todoListId: string,
        taskId: string,
        status: TaskStatuses
    }

}

export interface ChangeTaskTitleAction {
    type: TasksActionEnum.CHANGE_TASK_TITLE,
    payload: {
        todoListId: string,
        taskId: string,
        newTitle: string
    }

}

export type TasksActions =
    RemoveTaskAction
    | AddTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction
    | AddTodoListAction
    | RemoveTodoListAction
