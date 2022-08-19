import {AddTaskAction, ChangeTaskStatusAction, ChangeTaskTitleAction, RemoveTaskAction, TasksActionEnum} from "./types";
import {TaskStatuses} from "../../../types/task.types";

export const TasksActionCreators = {
    removeTask: (todoListId: string, taskId: string): RemoveTaskAction => ({
        type: TasksActionEnum.REMOVE_TASK,
        payload: {todoListId, taskId}
    }),
    addTask: (todoListId: string, taskTitle: string): AddTaskAction => ({
        type: TasksActionEnum.ADD_TASK,
        payload: {todoListId, taskTitle}
    }),
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusAction => ({
        type: TasksActionEnum.CHANGE_TASK_STATUS,
        payload: {todoListId, taskId, status}
    }),
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleAction => ({
        type: TasksActionEnum.CHANGE_TASK_TITLE,
        payload: {todoListId, taskId, newTitle}
    })
}