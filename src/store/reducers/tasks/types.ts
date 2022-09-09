import {AddTodoListAction, RemoveTodoListAction, SetTodoListsAction} from "../todolists/types";
import {ITask, TaskStatuses} from "../../../types/task.types";

export interface ITasksState {
    [key: string]: ITask[]
}

export enum TasksActionEnum {
    REMOVE_TASK = 'REMOVE-TASK',
    ADD_TASK = 'ADD-TASK',
    CHANGE_TASK = 'CHANGE-TASK',
    SET_TASKS = 'SET-TASKS'
}

export interface SetTasksAction {
    type: TasksActionEnum.SET_TASKS,
    payload: {
        tasks: ITask[],
        todoListId: string
    }
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
        task: ITask
    }

}


export interface ChangeTask {
    type: TasksActionEnum.CHANGE_TASK,
    payload: {
        task: ITask
    }

}

export type TasksActions =
    RemoveTaskAction
    | AddTaskAction
    | ChangeTask
    | AddTodoListAction
    | RemoveTodoListAction
    | SetTodoListsAction
    | SetTasksAction
