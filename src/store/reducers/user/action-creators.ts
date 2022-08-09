import {IncrementAgeAction, IncrementChildrenCountAction, SetUserNameAction, UserActionEnum} from "./types";

export const UserActionCreators = {
    incrementAge: (): IncrementAgeAction => ({type: UserActionEnum.INCREMENT_AGE}),
    incrementChildrenCount: (): IncrementChildrenCountAction => ({type: UserActionEnum.INCREMENT_CHILDREN_COUNT}),
    setUserNameAction: (newName: string): SetUserNameAction => ({type: UserActionEnum.SET_USER_NAME, newName})
}
