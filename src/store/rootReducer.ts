import {reducer as authReducer} from "./auth/auth.slice";
import {reducer as appReducer} from './app/app.slice';
import {reducer as tasksReducer} from './tasks/tasks.slice';
import {reducer as todoListsReducer} from './todolists/todolists.slice';

export const reducers = {
    auth: authReducer,
    app: appReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer
}