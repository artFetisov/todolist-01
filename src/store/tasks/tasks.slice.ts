import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITasksState} from "./tasks.types";
import {ITask} from "../../types/task.types";
import {RequestStatusType} from "../../types/app.types";
import {addTodoList, removeTodoList, setTodoLists} from "../todolists/todolists.slice";
import {ITodoListFetch} from "../../types/todo-list.types";
import {createTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "./tasks.actions";

const initialState: ITasksState = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setEntityStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const task = state[action.payload.todoListId].find(t => t.id === action.payload.taskId)
            if (task) task.entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: builder => {
        builder.addCase(setTodoLists, (state, action: PayloadAction<{ todoLists: ITodoListFetch[] }>) => {
            action.payload.todoLists.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(addTodoList, (state, action: PayloadAction<{ newTodoList: ITodoListFetch }>) => {
            state[action.payload.newTodoList.id] = []
        })
        builder.addCase(removeTodoList, (state, action: PayloadAction<{ todoListId: string }>) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            if (action.payload) state[action.payload.todoListId] = action.payload.tasks
        })
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
            if (action.payload) state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId] = state[action.payload.todoListId].filter(task => task.id !== action.payload?.taskId)
            }
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload?.id)
                if (index > -1) state[action.payload.todoListId][index] = action.payload
            }
        })
    }
})


export const {setEntityStatus} = tasksSlice.actions

export const {reducer} = tasksSlice