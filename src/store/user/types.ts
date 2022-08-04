export interface IUserState {
    age: number
    childrenCount: number
    name: string
}

export enum UserActionEnum {
    INCREMENT_AGE = 'INCREMENT-AGE',
    INCREMENT_CHILDREN_COUNT = 'INCREMENT-CHILDREN-COUNT',
    SET_USER_NAME = 'SET-USER-NAME',
}

export interface IncrementAgeAction {
    type: UserActionEnum.INCREMENT_AGE
}

export interface IncrementChildrenCountAction {
    type: UserActionEnum.INCREMENT_CHILDREN_COUNT
}

export interface SetUserNameAction {
    type: UserActionEnum.SET_USER_NAME,
    newName: string
}

export type UserActions = IncrementAgeAction | IncrementChildrenCountAction | SetUserNameAction