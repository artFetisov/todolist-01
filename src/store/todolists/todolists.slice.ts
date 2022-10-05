import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoListStateType} from "./todolists.types";
import {FilterValuesType, ITodoListFetch} from "../../types/todo-list.types";
import {RequestStatusType} from "../../types/app.types";


const initialState: TodoListStateType[] = []

const todoListsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodoList(state, action: PayloadAction<{ todoListId: string }>) {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        },
        addTodoList(state, action: PayloadAction<{ newTodoList: ITodoListFetch }>) {
            state.unshift({...action.payload.newTodoList, filter: 'all', listStatus: 'idle'})
        },
        changeTodoListTitle(state, action: PayloadAction<{ todoListId: string, newTitle: string }>) {
            const todoList = state.find(tl => tl.id === action.payload.todoListId)
            if (todoList) {
                todoList.title = action.payload.newTitle
            }
        },
        changeTodoListFilter(state, action: PayloadAction<{ todoListId: string, newFilter: FilterValuesType }>) {
            const todoList = state.find(tl => tl.id === action.payload.todoListId)
            if (todoList) {
                todoList.filter = action.payload.newFilter
            }
        },
        setTodoLists(state, action: PayloadAction<{ todoLists: ITodoListFetch[] }>) {
            return action.payload.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                listStatus: 'idle'
            }))
        },
        setListStatus(state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) {
            const todoList = state.find(tl => tl.id === action.payload.todoListId)
            if (todoList) {
                todoList.listStatus = action.payload.status
            }
        }
    },

})

export const {
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
    changeTodoListFilter,
    setTodoLists,
    setListStatus
} = todoListsSlice.actions

console.log(todoListsSlice.name)

export const {reducer} = todoListsSlice