import {IUserState, UserActionEnum, UserActions} from "./types";


const initialState: IUserState = {
    age: 30,
    childrenCount: 2,
    name: 'Artem'
}

export default function userReducer(state: IUserState = initialState, action: UserActions): IUserState {
    switch (action.type) {
        case UserActionEnum.INCREMENT_AGE:
            return {
                ...state, age: state.age + 1
            }

        case UserActionEnum.INCREMENT_CHILDREN_COUNT:
            return {
                ...state, childrenCount: state.childrenCount + 1
            }

        case UserActionEnum.SET_USER_NAME:
            return {
                ...state, name: action.newName
            }

        default:
            return state
    }
}