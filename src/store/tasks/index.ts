import {v1} from "uuid";
import {ITasksState, TasksActionEnum, TasksActions} from "./types";
import {ITodoItem} from "../../components/ui/todolist/todolist.types";

const initialState: ITasksState = {
    [v1()]: [
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'TS', isDone: false},
    ],
    [v1()]: [
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'TS', isDone: false},
    ]
}

export default function tasksReducer(state: ITasksState = initialState, action: TasksActions): ITasksState {
    switch (action.type) {
        case TasksActionEnum.REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }

        case TasksActionEnum.ADD_TASK:
            const newTask: ITodoItem = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }

            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }

        case TasksActionEnum.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.status
                } : task)
            }

        case TasksActionEnum.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.newTitle
                } : task)
            }

        default:
            return state
    }
}