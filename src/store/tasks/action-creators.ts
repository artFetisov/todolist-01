import {AddTaskAction, ChangeTaskStatusAction, ChangeTaskTitleAction, RemoveTaskAction, TasksActionEnum} from "./types";

export const TasksActionCreators = {
    removeTask: (todoListId: string, taskId: string): RemoveTaskAction => ({
        type: TasksActionEnum.REMOVE_TASK,
        todoListId,
        taskId
    }),
    addTask: (todoListId: string, taskTitle: string): AddTaskAction => ({
        type: TasksActionEnum.ADD_TASK,
        todoListId,
        taskTitle
    }),
    changeTaskStatus: (todoListId: string, taskId: string, status: boolean): ChangeTaskStatusAction => ({
        type: TasksActionEnum.CHANGE_TASK_STATUS,
        todoListId,
        taskId,
        status
    }),
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleAction => ({
        type: TasksActionEnum.CHANGE_TASK_TITLE,
        todoListId,
        taskId,
        newTitle
    })
}