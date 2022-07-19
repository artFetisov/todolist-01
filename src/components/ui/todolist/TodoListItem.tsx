import React, {ChangeEvent, FC} from "react";
import {ITodoItem} from "./todolist.types";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";

interface ITodoItemProps {
    task: ITodoItem
    removeHandler: (id: string, todoListId: string) => void
    changeTask: (taskId: string, isDone: boolean, todoListId: string) => void
    todoListId: string
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
}


export const TodoListItem: FC<ITodoItemProps> = ({task, removeHandler, changeTask, todoListId, changeTaskTitle}) => {
    function onRemoveHandler() {
        removeHandler(task.id, todoListId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        changeTask(task.id, e.currentTarget.checked, todoListId)
    }

    function changeTaskTitleHandler(title: string) {
        changeTaskTitle(todoListId, task.id, title)
    }

    return <li className={task.isDone ? styles.isDone : ''}>
        <Input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
        <Button children='X' onClick={onRemoveHandler}/>
    </li>
}