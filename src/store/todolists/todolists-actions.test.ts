import {v1} from "uuid";
import {TodoListStateType} from "./todolists.types";
import {removeTodoList, addTodoList, changeTodoListTitle, changeTodoListFilter} from "./todolists.slice";
import {reducer as todoListsReducer} from './todolists.slice';

//
// let todoListId1: string
// let todoListId2: string
// let startState: TodoListStateType[]
//
// beforeEach(() => {
//     todoListId1 = v1()
//     todoListId2 = v1()
//     startState = [
//         {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, listStatus: 'idle'},
//         {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, listStatus: 'idle'}
//     ]
// })
//
//
// test('correct todolist should be removed', () => {
//     const endState = todoListsReducer(startState, removeTodoList({todoListId: todoListId1}))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todoListId2)
//     expect(endState[0].title).toBe('What to buy')
//     expect(endState[0].filter).toBe('all')
// })
//
// test('correct todolist should be added', () => {
//     let newTodoListTitle = 'New Todolist'
//     const endState = todoListsReducer(startState, addTodoList({newTodoList: newTodoListTitle}))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe(newTodoListTitle)
// })
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = 'New Todolist'
//     const endState = todoListsReducer(startState, changeTodoListTitle({
//         todoListId: todoListId2,
//         newTitle: newTodolistTitle
//     }))
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTodolistTitle)
// })
//
// test('correct filter of todolist should be changed', () => {
//     const newFilter: FilterValuesType = 'completed'
//     const endState = todoListsReducer(startState, TodoListsActionCreators.changeTodoListFilter(todoListId2, newFilter))
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })