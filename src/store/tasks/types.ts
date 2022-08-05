import {ITodoItem} from "../../components/ui/todolist/todolist.types";

export interface ITasksState {
    [key: string]: ITodoItem[]
}

export enum TasksActionEnum {
    REMOVE_TASK = 'REMOVE-TASK',
    ADD_TASK = 'ADD-TASK',
    CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
    CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
}

export interface RemoveTaskAction {
    type: TasksActionEnum.REMOVE_TASK,
    todoListId: string,
    taskId: string
}

export interface AddTaskAction {
    type: TasksActionEnum.ADD_TASK,
    todoListId: string,
    taskTitle: string
}

export interface ChangeTaskStatusAction {
    type: TasksActionEnum.CHANGE_TASK_STATUS,
    todoListId: string,
    taskId: string,
    status: boolean
}

export interface ChangeTaskTitleAction {
    type: TasksActionEnum.CHANGE_TASK_TITLE,
    todoListId: string,
    taskId: string,
    newTitle: string
}

export type TasksActions = RemoveTaskAction | AddTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction
