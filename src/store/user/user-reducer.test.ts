import userReducer from "./index";
import {UserActionCreators} from "./action-creators";

test('user reducer should increment only age', () => {
    const startState = {age: 31, childrenCount: 2, name: 'Artem'}

    const endState = userReducer(startState, UserActionCreators.incrementAge())

    expect(endState.age).toBe(32)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe('Artem')
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 31, childrenCount: 2, name: 'Artem'}

    const endState = userReducer(startState, UserActionCreators.incrementChildrenCount())

    expect(endState.age).toBe(31)
    expect(endState.childrenCount).toBe(3)
    expect(endState.name).toBe('Artem')
})

test('user reducer should change name of user', () => {
    const startState = {name: 'Roma', age: 5, childrenCount: 0}
    const newName = 'Nika'
    const endState = userReducer(startState, UserActionCreators.setUserNameAction(newName))

    expect(endState.name).toBe(newName)
    expect(endState.age).toBe(5)
    expect(endState.childrenCount).toBe(0)
})
