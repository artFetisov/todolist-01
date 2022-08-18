import {ITasksState} from "./types";
import tasksReducer from "./index";
import {TasksActionCreators} from "./action-creators";
import {TodoListsActionCreators} from "../todolists/action-creators";

let startState: ITasksState

beforeEach(() => {
    startState = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'TS', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Webpack', isDone: false},
            {id: '2', title: 'SCSS', isDone: false},
            {id: '3', title: 'Angular', isDone: false},
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, TasksActionCreators.removeTask('todoListId2', '2'))

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId2"].every(t => t.id !== '2')).toBeTruthy()
    expect(endState["todoListId2"][1].title).toBe('Angular')
    expect(endState).toEqual({
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'TS', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Webpack', isDone: false},
            {id: '3', title: 'Angular', isDone: false},
        ],
    })
})

test('correct task should be added from correct array', () => {
    const title = 'Sugar'

    const endState = tasksReducer(startState, TasksActionCreators.addTask('todoListId2', title))

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(4)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe(title)
    expect(endState["todoListId2"][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, TasksActionCreators.changeTaskStatus('todoListId2', '2', false))

    expect(endState["todoListId2"][1].isDone).toBeFalsy()
    expect(endState["todoListId1"][1].isDone).toBeTruthy()
})


test('title of specified task should be changed', () => {
    const newTitle = 'Abracadabra'

    const endState = tasksReducer(startState, TasksActionCreators.changeTaskTitle('todoListId2', '2', newTitle))

    expect(endState["todoListId2"][1].title).toBe(newTitle)
    expect(endState["todoListId2"][2].title).toBe('Angular')
    expect(endState["todoListId1"][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, TodoListsActionCreators.addTodoList('todoListId3'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, TodoListsActionCreators.removeTodoList('todoListId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
})
