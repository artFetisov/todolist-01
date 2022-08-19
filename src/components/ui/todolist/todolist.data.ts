import {v1} from 'uuid'
import {TodoListType} from "../../../types/todo-list.types";
import {ITask, ITasks, TaskPriorities, TaskStatuses} from "../../../types/task.types";

export const todoListsData: TodoListType[] = [
    {id: v1(), title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: v1(), title: 'What to buy', filter: 'all', addedDate: '', order: 0},
]

export const tasks1: ITask[][] = [[
    {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.NEW,
        description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    {
        id: v1(), title: 'TS', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    {
        id: v1(), title: 'NODEJS', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    {
        id: v1(), title: 'SCSS', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    {
        id: v1(), title: 'SASS', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
], [
    {
        id: v1(), title: 'milk', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    {
        id: v1(), title: 'sugar', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
    {
        id: v1(), title: 'bread', status: TaskStatuses.NEW, description: '',
        completed: false,
        priority: TaskPriorities.MIDDLE,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: ''
    },
]]

export const allTasks: ITasks = {}

for (let i = 0; i < todoListsData.length; i++) {
    allTasks[todoListsData[i].id] = tasks1[i]
}

export const btnTitles: string[] = ['All', 'Active', 'Completed',]

