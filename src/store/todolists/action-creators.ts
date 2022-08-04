import {
    AddTodoListAction,
    ChangeTodoListFilterAction,
    ChangeTodoListTitleAction,
    RemoveTodoListAction,
    TodoListActionEnum
} from "./types";
import {FilterValuesType} from "../../components/ui/todolist/todolist.types";


export const TodoListsActionCreators = {
    removeTodoList: (todoListID: string): RemoveTodoListAction => ({
        type: TodoListActionEnum.REMOVE_TODO_LIST,
        todoListID
    }),
    addTodoList: (newTodoListTitle: string): AddTodoListAction => ({
        type: TodoListActionEnum.ADD_TODO_LIST,
        newTodoListTitle
    }),
    changeTodoListTitle: (todoListID: string, newTitle: string): ChangeTodoListTitleAction => ({
        type: TodoListActionEnum.CHANGE_TODO_LIST_TITLE,
        todoListID,
        newTitle
    }),
    changeTodoListFilter: (todoListID: string, newFilter: FilterValuesType): ChangeTodoListFilterAction => ({
        type: TodoListActionEnum.CHANGE_TODO_LIST_FILTER,
        todoListID,
        newFilter
    })
}
