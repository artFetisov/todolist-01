import {
    AddTodoListAction,
    ChangeTodoListFilterAction,
    ChangeTodoListTitleAction,
    RemoveTodoListAction,
    TodoListActionEnum
} from "./types";
import {FilterValuesType} from "../../../components/ui/todolist/todolist.types";
import {v1} from "uuid";


export const TodoListsActionCreators = {
    removeTodoList: (todoListID: string): RemoveTodoListAction => ({
        type: TodoListActionEnum.REMOVE_TODO_LIST,
        payload: {todoListID}
    }),
    addTodoList: (newTodoListTitle: string): AddTodoListAction => ({
        type: TodoListActionEnum.ADD_TODO_LIST,
        payload: {newTodoListTitle, todoListId: v1()}
    }),
    changeTodoListTitle: (todoListID: string, newTitle: string): ChangeTodoListTitleAction => ({
        type: TodoListActionEnum.CHANGE_TODO_LIST_TITLE,
        payload: {todoListID, newTitle}
    }),
    changeTodoListFilter: (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterAction => ({
        type: TodoListActionEnum.CHANGE_TODO_LIST_FILTER,
        payload: {todoListID, newFilter}
    })
}
