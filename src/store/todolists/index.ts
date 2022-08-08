import {v1} from "uuid";
import {ITodoListState, TodoListActionEnum, TodoListActions} from "./types";

const initialState: ITodoListState[] = [
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'},
]

export default function todoListsReducer(state: ITodoListState[] = initialState, action: TodoListActions): ITodoListState[] {
    switch (action.type) {
        case TodoListActionEnum.ADD_TODO_LIST:
            const newTodoList: ITodoListState = {
                id: action.payload.todoListId,
                title: action.payload.newTodoListTitle,
                filter: 'all'
            }
            return [...state, newTodoList]

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