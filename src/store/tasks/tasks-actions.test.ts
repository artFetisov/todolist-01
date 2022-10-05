export {}

// import {ITasksState} from "./types";
// import tasksReducer from "./index";
// import {TasksActionCreators} from "./action-creators";
// import {TodoListsActionCreators} from "../todolists/action-creators";
// import {TaskPriorities, TaskStatuses} from "../../../types/task.types";
//
// let startState: ITasksState
//
// const finalStateAfterDeletedTask = {
//     'todoListId1': [
//         {
//             id: '1', title: 'CSS', status: TaskStatuses.NEW, description: '', completed: false,
//             priority: TaskPriorities.MIDDLE, startDate: '', deadline: '',
//             todoListId: '', order: 0, addedDate: ''
//         },
//         {
//             id: '2',
//             title: 'JS',
//             status: TaskStatuses.NEW,
//             description: '',
//             completed: false,
//             priority: TaskPriorities.MIDDLE,
//             startDate: '',
//             deadline: '',
//             todoListId: '',
//             order: 0,
//             addedDate: ''
//         },
//         {
//             id: '3', title: 'TS', status: TaskStatuses.NEW, description: '',
//             completed: false,
//             priority: TaskPriorities.MIDDLE,
//             startDate: '',
//             deadline: '',
//             todoListId: '',
//             order: 0,
//             addedDate: ''
//         },
//     ],
//     'todoListId2': [
//         {
//             id: '1', title: 'Webpack', status: TaskStatuses.NEW, description: '',
//             completed: false,
//             priority: TaskPriorities.MIDDLE,
//             startDate: '',
//             deadline: '',
//             todoListId: '',
//             order: 0,
//             addedDate: ''
//         },
//         {
//             id: '3', title: 'Angular', status: TaskStatuses.NEW, description: '',
//             completed: false,
//             priority: TaskPriorities.MIDDLE,
//             startDate: '',
//             deadline: '',
//             todoListId: '',
//             order: 0,
//             addedDate: ''
//         },
//     ],
// }
//
// beforeEach(() => {
//     startState = {
//         'todoListId1': [
//             {
//                 id: '1', title: 'CSS', status: TaskStatuses.NEW, description: '',
//                 priority: TaskPriorities.MIDDLE, startDate: '', deadline: '',
//                 todoListId: '', order: 0, addedDate: ''
//             },
//             {
//                 id: '2',
//                 title: 'JS',
//                 status: TaskStatuses.NEW,
//                 description: '',
//
//                 priority: TaskPriorities.MIDDLE,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: '3', title: 'TS', status: TaskStatuses.NEW, description: '',
//
//                 priority: TaskPriorities.MIDDLE,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//         ],
//         'todoListId2': [
//             {
//                 id: '1', title: 'Webpack', status: TaskStatuses.NEW, description: '',
//
//                 priority: TaskPriorities.MIDDLE,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: '2', title: 'SCSS', status: TaskStatuses.NEW, description: '',
//
//                 priority: TaskPriorities.MIDDLE,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//             {
//                 id: '3', title: 'Angular', status: TaskStatuses.NEW, description: '',
//
//                 priority: TaskPriorities.MIDDLE,
//                 startDate: '',
//                 deadline: '',
//                 todoListId: '',
//                 order: 0,
//                 addedDate: ''
//             },
//         ],
//     }
// })
//
// test('correct task should be deleted from correct array', () => {
//     const endState = tasksReducer(startState, TasksActionCreators.removeTask('todoListId2', '2'))
//
//     expect(endState["todoListId1"].length).toBe(3)
//     expect(endState["todoListId2"].length).toBe(2)
//     expect(endState["todoListId2"].every(t => t.id !== '2')).toBeTruthy()
//     expect(endState["todoListId2"][1].title).toBe('Angular')
//     expect(endState).toEqual(finalStateAfterDeletedTask)
// })

// test('correct task should be added from correct array', () => {
//     const title = 'Sugar'
//
//     const endState = tasksReducer(startState, TasksActionCreators.addTask('todoListId2', title))
//
//     expect(endState["todoListId1"].length).toBe(3)
//     expect(endState["todoListId2"].length).toBe(4)
//     expect(endState["todoListId2"][0].id).toBeDefined()
//     expect(endState["todoListId2"][0].title).toBe(title)
//     expect(endState["todoListId2"][0].status).toBe(TaskStatuses.NEW)
// })


// test('status of specified task should be changed', () => {
//     const endState = tasksReducer(startState, TasksActionCreators.changeTaskStatus('todoListId2', '2', TaskStatuses.NEW))
//
//     expect(endState["todoListId2"][1].status).toBe(TaskStatuses.NEW)
//     expect(endState["todoListId1"][1].status).toBe(TaskStatuses.NEW)
// })


// test('title of specified task should be changed', () => {
//     const newTitle = 'Abracadabra'
//
//     const endState = tasksReducer(startState, TasksActionCreators.changeTaskTitle('todoListId2', '2', newTitle))
//
//     expect(endState["todoListId2"][1].title).toBe(newTitle)
//     expect(endState["todoListId2"][2].title).toBe('Angular')
//     expect(endState["todoListId1"][1].title).toBe('JS')
// })

// test('new array should be added when new todolist is added', () => {
//     const endState = tasksReducer(startState, TodoListsActionCreators.addTodoList('todoListId3'))
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })

// test('property with todolistId should be deleted', () => {
//     const endState = tasksReducer(startState, TodoListsActionCreators.removeTodoList('todoListId2'))
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todoListId2']).not.toBeDefined()
// })
