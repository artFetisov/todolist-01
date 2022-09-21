import {ITasksState, TasksActionEnum, TasksActions} from "./types";
import {TodoListActionEnum} from "../todolists/types";

const initialState: ITasksState = {}

export default function tasksReducer(state: ITasksState = initialState, action: TasksActions): ITasksState {
    switch (action.type) {
        case TasksActionEnum.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }

        case TasksActionEnum.CHANGE_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(task => task.id === action.payload.task.id ? {
                    ...action.payload.task
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
                [action.payload.newTodoList.id]: []
            }

        case TodoListActionEnum.REMOVE_TODO_LIST:
            delete state[action.payload.todoListID]
            return {...state}

        case TodoListActionEnum.SET_TODO_LISTS:
            const stateCopy = {...state}
            action.payload.todoLists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy

        case TasksActionEnum.SET_ENTITY_STATUS:
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId
                    ? {...t, entityStatus: action.payload.entityStatus}
                    : t)
            }

        case TasksActionEnum.SET_TASKS:
            return {
                ...state,
                [action.payload.todoListId]: action.payload.tasks
            }

        default:
            return state
    }
}