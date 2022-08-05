import {ITasksState} from "./types";
import tasksReducer from "./index";
import {TasksActionCreators} from "./action-creators";

test('correct task should be deleted from correct array', () => {
    const startState: ITasksState = {
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

    const endState = tasksReducer(startState, TasksActionCreators.removeTask('todoListId2', '2'))

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId2"].every(t => t.id !== '2')).toBeTruthy()
    expect(endState["todoListId2"][1].title).toBe('Angular')
})

test('correct task should be added from correct array', () => {
    const startState: ITasksState = {
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

    const title = 'Sugar'

    const endState = tasksReducer(startState, TasksActionCreators.addTask('todoListId2', title))

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(4)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe(title)
    expect(endState["todoListId2"][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {
    const startState: ITasksState = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'TS', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Webpack', isDone: false},
            {id: '2', title: 'SCSS', isDone: true},
            {id: '3', title: 'Angular', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, TasksActionCreators.changeTaskStatus('todoListId2', '2', false))

    expect(endState["todoListId2"][1].isDone).toBeFalsy()
    expect(endState["todoListId1"][1].isDone).toBeTruthy()
})


test('title of specified task should be changed', () => {
    const startState: ITasksState = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'TS', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'Webpack', isDone: false},
            {id: '2', title: 'SCSS', isDone: true},
            {id: '3', title: 'Angular', isDone: false},
        ],
    }

    const newTitle = 'Abracadabra'

    const endState = tasksReducer(startState, TasksActionCreators.changeTaskTitle('todoListId2', '2', newTitle))

    expect(endState["todoListId2"][1].title).toBe(newTitle)
    expect(endState["todoListId1"][1].title).toBe('JS')
})
