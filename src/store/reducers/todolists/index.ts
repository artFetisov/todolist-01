import {TodoListActionEnum, TodoListActions, TodoListStateType} from "./types";
import {todoListsData} from "../../../components/ui/todolist/todolist.data";

const initialState: TodoListStateType[] = todoListsData

export default function todoListsReducer(state: TodoListStateType[] = initialState, action: TodoListActions): TodoListStateType[] {
    switch (action.type) {

        case TodoListActionEnum.ADD_TODO_LIST:
            const newTodoList: TodoListStateType = {
                id: action.payload.todoListId,
                title: action.payload.newTodoListTitle,
                filter: 'all',
                addedDate: '',
                order: 0
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

        default:
            return state
    }
}