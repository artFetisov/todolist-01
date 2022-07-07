import {ITodoItem} from "./todolist.types";
import {v1} from 'uuid'


export const tasks1: ITodoItem[] = [
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'TS', isDone: true},
    {id: v1(), title: 'NODEJS', isDone: false},
    {id: v1(), title: 'SCSS', isDone: false},
    {id: v1(), title: 'SASS', isDone: true},
]

export const btnTitles: string[] = ['All', 'Active', 'Completed',]

