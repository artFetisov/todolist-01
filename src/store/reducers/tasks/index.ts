import {v1} from "uuid";
import {ITasksState, TasksActionEnum, TasksActions} from "./types";
import {TodoListActionEnum} from "../todolists/types";
import {allTasks} from "../../../components/ui/todolist/todolist.data";
import {ITask, TaskPriorities, TaskStatuses} from "../../../types/task.types";

const initialState: ITasksState = allTasks

export default function tasksReducer(state: ITasksState = initialState, action: TasksActions): ITasksState {
    switch (action.type) {
        case TasksActionEnum.ADD_TASK:
            const newTask: ITask = {
                id: v1(),
                title: action.payload.taskTitle,
                status: TaskStatuses.NEW,
                description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
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
                    status: action.payload.status
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