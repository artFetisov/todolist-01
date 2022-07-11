import React, {ChangeEvent, FC} from "react";
import {ITodoItem} from "./todolist.types";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import styles from './TodoList.module.css'

interface ITodoItemProps {
    task: ITodoItem
    removeHandler: (id: string, todoListId: string) => void
    changeTask: (taskId: string, isDone: boolean, todoListId: string) => void
    todoListId: string
}


export const TodoListItem: FC<ITodoItemProps> = ({task, removeHandler, changeTask, todoListId}) => {
    function onRemoveHandler() {
        removeHandler(task.id, todoListId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        changeTask(task.id, e.currentTarget.checked, todoListId)
    }

    return <li className={task.isDone ? styles.isDone : ''}>
        <Input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
        <span>{task.title}</span>
        <Button children='X' onClick={onRemoveHandler}/>
    </li>
}