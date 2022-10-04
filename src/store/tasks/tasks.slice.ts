import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITasksState} from "./tasks.types";
import {ITask} from "../../types/task.types";
import {RequestStatusType} from "../../types/app.types";

const initialState: ITasksState = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            state[action.payload.todoListId] = state[action.payload.todoListId].filter(task => task.id !== action.payload.taskId)
        },
        addTask(state, action: PayloadAction<ITask>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        changeTask(state, action: PayloadAction<ITask>) {
            let task = state[action.payload.todoListId].find(t => t.id === action.payload.id)
            if (task) {
                task = action.payload
            }
        },
        setTasks(state, action: PayloadAction<{ todoListId: string, tasks: ITask[] }>) {
            state[action.payload.todoListId] = action.payload.tasks

        },
        setEntityStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const task = state[action.payload.todoListId].find(t => t.id === action.payload.taskId)
            if (task) {
                task.entityStatus = action.payload.entityStatus
            }
        }
    }
})

export const {removeTask, addTask, changeTask, setTasks, setEntityStatus} = tasksSlice.actions

export const {reducer} = tasksSlice