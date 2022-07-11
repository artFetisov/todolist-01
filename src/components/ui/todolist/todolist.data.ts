import {ITodoItem, ITodoList, ITasks} from "./todolist.types";
import {v1} from 'uuid'

export const todoListsData: ITodoList[] = [
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'},
]

export const tasks1: ITodoItem[][] = [[
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'TS', isDone: true},
    {id: v1(), title: 'NODEJS', isDone: false},
    {id: v1(), title: 'SCSS', isDone: false},
    {id: v1(), title: 'SASS', isDone: true},
], [
    {id: v1(), title: 'milk', isDone: false},
    {id: v1(), title: 'sugar', isDone: true},
    {id: v1(), title: 'bread', isDone: false},
]]

export const allTasks: ITasks = {}

for (let i = 0; i < todoListsData.length; i++) {
    allTasks[todoListsData[i].id] = tasks1[i]
}


export const btnTitles: string[] = ['All', 'Active', 'Completed',]

