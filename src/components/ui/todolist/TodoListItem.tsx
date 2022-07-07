import React, {ChangeEvent, FC} from "react";
import {ITodoItem} from "./todolist.types";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import styles from './TodoList.module.css'

interface ITodoItemProps {
    task: ITodoItem
    removeHandler: (id: string) => void
    changeTask: (taskId: string, isDone: boolean) => void
}


export const TodoListItem: FC<ITodoItemProps> = ({task, removeHandler, changeTask}) => {
    const onRemoveHandler = () => {
        removeHandler(task.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTask(task.id, e.currentTarget.checked)
    }

    return <li className={task.isDone ? styles.isDone : ''}>
        <Input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
        <span>{task.title}</span>
        <Button children='X' onClick={onRemoveHandler}/>
    </li>
}