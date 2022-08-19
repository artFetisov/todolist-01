import {ITasksState} from "./types";
import tasksReducer from "./index";
import todoListsReducer from "../todolists";
import {TodoListsActionCreators} from "../todolists/action-creators";
import {TodoListStateType} from "../todolists/types";

test('ids should be equals', () => {
    const startTasksState: ITasksState = {}
    const startTodoListsState: TodoListStateType[] = []

    const newTodoListTitle = 'What to drink'
    const action = TodoListsActionCreators.addTodoList(newTodoListTitle)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodoLists).toBe(action.payload.todoListId)
    expect(idFromTasks).toBe(idFromTodoLists)
})