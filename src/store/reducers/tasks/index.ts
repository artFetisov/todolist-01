import {v1} from "uuid";
import {ITasksState, TasksActionEnum, TasksActions} from "./types";
import {ITodoItem} from "../../../components/ui/todolist/todolist.types";
import {TodoListActionEnum} from "../todolists/types";
import {allTasks} from "../../../components/ui/todolist/todolist.data";

const initialState: ITasksState = allTasks

export default function tasksReducer(state: ITasksState = initialState, action: TasksActions): ITasksState {
    switch (action.type) {
        case TasksActionEnum.ADD_TASK:
            const newTask: ITodoItem = {
                id: v1(),
                title: action.payload.taskTitle,
                isDone: false
            }
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }

        case TasksActionEnum.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.status
                } : task)
            }

        case TasksActionEnum.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTitle
                } : task)
            }

        case TasksActionEnum.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.taskId)
            }

        case TodoListActionEnum.ADD_TODO_LIST:
            return {
                ...state,
                [action.payload.todoListId]: []
            }

        case TodoListActionEnum.REMOVE_TODO_LIST:
            delete state[action.payload.todoListID]
            return {...state}

        default:
            return state
    }
}