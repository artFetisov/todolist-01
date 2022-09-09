import {TodoListActionEnum, TodoListActions, TodoListStateType} from "./types";

const initialState: TodoListStateType[] = []

export default function todoListsReducer(state: TodoListStateType[] = initialState, action: TodoListActions): TodoListStateType[] {
    switch (action.type) {

        case TodoListActionEnum.ADD_TODO_LIST:
            const newTodoList: TodoListStateType = {
                ...action.payload.newTodoList,
                filter: 'all',
                listStatus: 'idle'
            }
            return [newTodoList, ...state]

        case TodoListActionEnum.CHANGE_TODO_LIST_TITLE:
            return state.map(list => list.id === action.payload.todoListID ? {
                ...list,
                title: action.payload.newTitle
            } : list)

        case TodoListActionEnum.CHANGE_TODO_LIST_FILTER:
            return state.map(list => list.id === action.payload.todoListID ? {
                ...list,
                filter: action.payload.newFilter
            } : list)

        case TodoListActionEnum.REMOVE_TODO_LIST:
            return state.filter(list => list.id !== action.payload.todoListID)

        case TodoListActionEnum.SET_TODO_LISTS:
            return action.payload.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                listStatus: 'idle'
            }))

        case TodoListActionEnum.SET_LIST_STATUS:
            return state.map(tl => tl.id === action.payload.todoListId ? {
                ...tl,
                listStatus: action.payload.status
            } : tl)

        default:
            return state
    }
}