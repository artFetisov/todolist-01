import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootState} from "../store";
import tasksReducer from "../store/reducers/tasks";
import todoListsReducer from "../store/reducers/todolists";
import {TaskPriorities, TaskStatuses} from "../types/task.types";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.NEW, description: '',
                completed: false,
                priority: TaskPriorities.MIDDLE,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)